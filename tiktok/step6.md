# ⚒️ Getting Started with Astra/Stargate and Netlify

In this step you will work with React Components to understand how they work, returning HTML via the render() function.  Header and FollowersColumn React Components will be created to use in our app.

**Objectives**
1. Brief introduction to Netlify
2. Install modules
3. Set up your netlify app with netlify-cli
4. Add netlify serverless functions


---

## Step 1. Brief introduction to Netlify

Now it is time to start getting post data into the Cassandra database. To get data in, you are going to create a serverless function. For this, you are going to use Netlify and Netlify functions. This means that it is not necessary to write a server, everything can be done with Netlify functions. Netlify deploys the functions you write as full API endpoints and will even run them automatically in response to events. If you haven't heard of Netlify functions before, this is a good place to start.  If you want to read more about Netlify, visit the [Getting Started documentation](https://docs.netlify.com/cli/get-started/).

## 2. Install modules.

You need a few more modules moving forward:
* netlify-cli gives you command line interfaces to netlify
* axios is the http module we're using
* @astrajs/collections is the astra node module we'll be using

`npm install netlify-cli --save-dev
grep netlify package.json
npm install axios @astrajs/collections`{{execute}}

## 3. Create Github Repository

In order to work with netlify, the netlify system needs to be able to see your code, so you will create a new github repository for this purpose.  You'll use the command line interface to make it easy.

First, install the gh tool:
`snap install gh`{{execute}}

Authenticate with the github service:
`gh auth login`{{execute}}

You want to use the following answers:
* github.com
* SSH
* Yes, create a key
* Your token from [github](https://github.com/settings/tokens)
  * The minimum required scopes are 'repo', 'read:org', 'admin:public-key'.

Paste it into the prompt for the login, and you should be ready to go.

Now move the new ssh file over the existing one.  The github command will have told you where the new ssh key is, and the easiest way to get it in place is to copy it back.  So, for instance, on my system these commands are:

`find /root/snap/gh -type f -name id_\* -exec cp {} /root/.ssh/ \;`{{execute}}

`ls /root/.ssh/id_* | grep -v pub | xargs chmod 400`{{execute}}

Start up your ssh-agent:
`eval "$(ssh-agent -s)"`{{execute}}

Add the ssh file to your chain
`ls ~/.ssh/id_* | grep -v pub | xargs ssh-add`{{execute}}

You also need to change the ownership of the file:

`chown root.root /root/.ssh/id*`{{execute}}

`gh repo create`{{execute}}

Take all of the default prompts here.  You may run into some trouble if you've already identified an origin or if the site already exists - you can remove the remotes and the remote repo and start again.

You may get an incorrect error with the end of this command.  To make sure it's working, do a `git push origin master`{{execute}}

## 4. Login to Netlify

Login to the Netlify service:

`npx netlify login`{{execute}}

Copy that long URL into your browser, and authorize the app.

Browse to the [Netlify Site](https://netlify.com).

* Click "New site from Github"
* Select Github
* Choose your astra-tik-tok repository
* Deploy site
* Wait for it to be complete, then visit the site

Make sure the site from Netlify matches up with what you see <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">locally</a>.  

A little red tape to finish linking everything up:

`npx netlify link`{{execute}}

Use the repo that you created and select the site to use.

Now you need to upload your .env variables.

`npx netlify env:import .env`{{execute}}

You're ready to start working with serverless Netlify functions now!






