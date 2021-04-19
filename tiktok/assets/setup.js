
const astraCollections = require('@astrajs/collections');
const astraRest = require('@astrajs/rest');
const chalk = require('chalk');
const os = require('os');
const fs = require('fs');
const readline = require('readline');
const ConfigParser = require("configparser");
const axios = require('axios');
const dotenv = require("parsenv");
const jq = require('node-jq');

// Set these to change which db/ks you want
const astra_keyspace = "tiktok"
const astra_database = "workshops"
const astra_section = "tiktok"


let response = '';
const envpath = '.env'
if (!fs.existsSync(envpath)) {
	fs.closeSync(fs.openSync(envpath, 'w'));
}
const astrapath = os.homedir() + '/.astrarc'
const astraconfig = new ConfigParser
    
if (!fs.existsSync(astrapath)) {
	fs.closeSync(fs.openSync(astrapath, 'w'));
} 

astraconfig.addSection(astra_section)

const config = {
    path: envpath
};

dotenv.config(config)

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function question (text) {
    return new Promise(resolve => {
		rl.question(text, resolve)
	})
}

async function close (text) {
    return new Promise(resolve => {
		rl.close(text, resolve)
	})
}

function wait(timeout) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}

async function getTokens() {
		let data = {};
		if (!process.env['ASTRA_DB_APPLICATION_TOKEN']) {         

			console.log('Login to Astra at https://dstx.io/workshops')
			console.log('After login, you can create a database.')
			console.log('    database: ' + astra_database)
			console.log('    keyspace: ' + astra_keyspace)
			console.log('Click on your name in the left-hand column')
			console.log('In the dropdown, select "Organization Settings"')
			console.log('    Select "Token Management" from the left-hand column')
			console.log('    Select "Database Administrator" in the Role dropdown')
			console.log('    Click "Generate Token"')
			console.log('    Save to CSV if you want to access it later')
			
			process.env['ASTRA_DB_ADMIN_TOKEN']= await question("Paste the 'Token' value here (starts with AstraCS) and hit return:\n")
			process.env['ASTRA_DB_ADMIN_TOKEN'] = process.env['ASTRA_DB_ADMIN_TOKEN'].replace(/"/g,"");
			dotenv.edit({ ASTRA_DB_ADMIN_TOKEN: process.env['ASTRA_DB_ADMIN_TOKEN']});
			astraconfig.set(astra_section,'ASTRA_DB_ADMIN_TOKEN', process.env['ASTRA_DB_ADMIN_TOKEN'])
			process.env['ASTRA_DB_APPLICATION_TOKEN'] = process.env['ASTRA_DB_ADMIN_TOKEN']
			dotenv.edit({ ASTRA_DB_APPLICATION_TOKEN: process.env['ASTRA_DB_ADMIN_TOKEN']});
			astraconfig.set(astra_section, 'ASTRA_DB_APPLICATION_TOKEN', process.env['ASTRA_DB_ADMIN_TOKEN'])
			dotenv.write(config)
			dotenv.config(config)
			return dotenv;
		}
		return dotenv;
}

async function requestWithRetry(astraClient, url) {
	const MAX_RETRIES = 20;
	for (let i = 1; i <= MAX_RETRIES; i++) {
		let response = await astraClient.get(url);
		if (response.data.status == 'ACTIVE') {
			return response;
		} else {
			const timeout = 5000 * i * 10;
			console.log('Waiting', timeout, 'ms');
			await wait(timeout);
		}
	}
}

let dbID = '';

start();

async function start() {
	console.log(chalk.yellow('Checking your credentials...\n'));

	let creds = await getTokens()
	if (!creds) {
		console.log(chalk.red('Need to set up authentication stuff'));
		process.exit(0);
	}
	axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.ASTRA_DB_ADMIN_TOKEN;
	console.log(chalk.yellow('Credentials set up, checking database'))
	dbID = await setUpDatabase();
	console.log(chalk.yellow('Database setup: ' + dbID));
	process.exit()
}

// First, check for a database
async function setUpDatabase() {
	let database = await findWorkShopDatabase(false);
	if (!database.id || database.status == 'TERMINATING') {
		let db = createDB();
		database = await findWorkShopDatabase(true);
	} else {
		console.log(chalk.yellow('Found existing ' + astra_database + ' database'));
	}

	dbID = database.id;

	if (database.status != 'ACTIVE') {
		console.log(chalk.yellow('     Current status is ' + database.status));

		const astraClient = await astraRest.createClient({
			applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
			baseUrl: 'https://api.astra.datastax.com',
		});
		let dbActive = await requestWithRetry(astraClient, '/v2/databases/' + dbID);
		console.log(chalk.yellow('     Database is now ACTIVE'));
	}

	// Check for the keyspace
	console.log(chalk.green('Checking for keyspace'));

	const astraClient = await astraRest.createClient({
		applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
		baseUrl: 'https://api.astra.datastax.com',
	});
	response = await astraClient.get('/v2/databases/' + dbID);
	if (response.data.info.keyspaces.indexOf(astra_keyspace) != -1) {
		console.log(chalk.green('     ' + astra_keyspace + ' keyspace found'));
		return dbID;
	} else {
		response = await astraClient.post('/v2/databases/' + dbID + '/keyspaces/' + astra_keyspace);
		console.log(chalk.yellow('     Created new ' + astra_keyspace + ' keyspace'));
		return dbID;
	}
}

async function findWorkShopDatabase(retry) {
	const astraClient = await astraRest.createClient({
		applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
		baseUrl: 'https://api.astra.datastax.com',
	});
	axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.ASTRA_DB_ADMIN_TOKEN;

	response = await astraClient.get('/v2/databases');
	databases = {};
	output = '';
	parseoutput = await jq.run('[.data[] | {id: .id, name: .info.name, status: .status, region: .info.region, keyspace: .info.keyspaces[0]}] | unique', response, {
		input: 'json',
	});
	JSON.parse(parseoutput).forEach((database) => {
		if (database.name == astra_database) {
			output = database;
		}
	});
	if (!output && retry) {
		const timeout = 5000 * 10;
		console.log(chalk.yellow('Waiting', timeout, 'ms'));
		await wait(timeout);
		output = findWorkShopDatabase(true);
	}
        astraconfig.read(astrapath)
        dotenv.edit({ ASTRA_DB_ID: output.id});
		astraconfig.set(astra_section,'ASTRA_DB_ID',output.id)
		dotenv.edit({ ASTRA_DB_REGION: output.region});
		astraconfig.set(astra_section,'ASTRA_DB_REGION',output.region)
		dotenv.edit({ ASTRA_DB_KEYSPACE: astra_keyspace});
		astraconfig.set(astra_section,'ASTRA_DB_KEYSPACE', astra_keyspace)
		
		dotenv.write(config)
		astraconfig.write(astrapath)
		dotenv.config(config)
	return output;
}

async function createDB() {
	console.log(chalk.green('Creating new database'));
	const astraClient = await astraRest.createClient({
		applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
		baseUrl: 'https://api.astra.datastax.com',
	});
	try {
		response = await astraClient.post('/v2/databases', {
			name: astra_database,
			keyspace: astra_keyspace,
			cloudProvider: 'GCP',
			tier: 'serverless',
			capacityUnits: 1,
			region: 'us-east1',
		});
	} catch (e) {
		console.log('ERROR:' + e);
	}
}

