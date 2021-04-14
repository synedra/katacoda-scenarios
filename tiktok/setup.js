
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

let response = '';
const envpath = '.env'
if (!fs.existsSync(envpath)) {
	fs.closeSync(fs.openSync(envpath, 'w'));
}
const astrapath = os.homedir() + '/.astrarc'

const config = {
    path: envpath
};

const astraconfig = new ConfigParser
astraconfig.addSection('default')

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
			console.log('    database: tiktok')
			console.log('    keyspace: entries')
			console.log('Click on the database name (tiktok) to view details.')
			console.log('Click on the Settings tab at the top of the screen')
			
			process.env['ASTRA_DB_ADMIN_TOKEN']= await question("Create an application token for Database Administrator\n    (save to CSV if desired)\n    and paste the 'Token' value here:\n")
			process.env['ASTRA_DB_ADMIN_TOKEN'] = process.env['ASTRA_DB_ADMIN_TOKEN'].replace(/"/g,"");
			dotenv.edit({ ASTRA_DB_ADMIN_TOKEN: process.env['ASTRA_DB_ADMIN_TOKEN']});
			astraconfig.set('default','ASTRA_DB_ADMIN_TOKEN', process.env['ASTRA_DB_ADMIN_TOKEN'])
			process.env['ASTRA_DB_APPLICATION_TOKEN'] = await question("Create an application token for API Admin User \n    (save to CSV if desired)\n    and paste the 'Token' value here:\n")
			process.env['ASTRA_DB_APPLICATION_TOKEN'] = process.env['ASTRA_DB_APPLICATION_TOKEN'].replace(/"/g,"");
			dotenv.edit({ ASTRA_DB_APPLICATION_TOKEN: process.env['ASTRA_DB_APPLICATION_TOKEN']});
			astraconfig.set('default', 'ASTRA_DB_APPLICATION_TOKEN', process.env['ASTRA_DB_APPLICATION_TOKEN'])
			dotenv.write(config)
			dotenv.config(config)
			astraconfig.write(astrapath)
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
	console.log(chalk.cyan('Checking your credentials...\n'));

	let creds = await getTokens()
	if (!creds) {
		console.log(chalk.red('Need to set up authentication stuff'));
		process.exit(0);
	}
	axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.ASTRA_DB_ADMIN_TOKEN;
	console.log(chalk.cyan('Credentials set up, checking database'))
	dbID = await setUpDatabase();
	console.log(chalk.cyan('Database setup: ' + dbID));
	process.exit()
}

// First, check for a tiktok database
async function setUpDatabase() {
	let database = await findTikTokDatabase(false);
	if (!database.id || database.status == 'TERMINATING') {
		let db = createDB();
		database = await findTikTokDatabase(true);
	} else {
		console.log(chalk.green('Found existing tiktok database'));
	}

	dbID = database.id;

	if (database.status != 'ACTIVE') {
		console.log(chalk.green('     Current status is ' + database.status));

		const astraClient = await astraRest.createClient({
			applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
			baseUrl: 'https://api.astra.datastax.com',
		});
		let dbActive = await requestWithRetry(astraClient, '/v2/databases/' + dbID);
		console.log(chalk.yellow('     Database is now ACTIVE'));
	}

	// Check for the keyspace
	console.log(chalk.green('Checking for classes keyspace'));

	const astraClient = await astraRest.createClient({
		applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
		baseUrl: 'https://api.astra.datastax.com',
	});
	response = await astraClient.get('/v2/databases/' + dbID);
	if (response.data.info.keyspaces.indexOf('classes') != -1) {
		console.log(chalk.green('     Classes keyspace found'));
		return dbID;
	} else {
		response = await astraClient.post('/v2/databases/' + dbID + '/keyspaces/classes');
		console.log(chalk.yellow('     Created new classes keyspace'));
		return dbID;
	}
}

async function findTikTokDatabase(retry) {
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
		if (database.name == 'tiktok') {
			output = database;
		}
	});
	if (!output && retry) {
		const timeout = 5000 * 10;
		console.log(chalk.yellow('Waiting', timeout, 'ms'));
		await wait(timeout);
		output = findNetlifyDatabase(true);
	}

	if (!process.env['ASTRA_DB_ID']) {
		dotenv.edit({ ASTRA_DB_ID: output.id});
		astraconfig.set('default','ASTRA_DB_ID',output.id)
		dotenv.edit({ ASTRA_DB_REGION: output.region});
		astraconfig.set('default','ASTRA_DB_REGION',output.region)
		dotenv.edit({ ASTRA_DB_KEYSPACE: output.keyspace});
		astraconfig.set('default','ASTRA_DB_KEYSPACE', output.keyspace)
		
		dotenv.write(config)
		dotenv.write(astraconfig)
		dotenv.config(config)
		astraconfig.write(astrapath)
	}
	return output;
}

async function createDB() {
	console.log(chalk.blue('Creating new tiktok database'));
	const astraClient = await astraRest.createClient({
		applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
		baseUrl: 'https://api.astra.datastax.com',
	});
	try {
		response = await astraClient.post('/v2/databases', {
			name: 'tiktok',
			keyspace: 'entries',
			cloudProvider: 'GCP',
			tier: 'serverless',
			capacityUnits: 1,
			region: 'us-east1',
		});
	} catch (e) {
		console.log('ERROR:' + e);
	}
}

