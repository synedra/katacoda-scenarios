# ⚒️ Credentials

**Objectives**
In this step, we will:
1. Set up credentials
2. Install HTTPie
3. Verify Credentials

---

# 1. Prepare the environment
Change into the setup directory.

Run 'npm install' to get requirements.

`npm install; clear`{{execute}}

Run setup.js

`node setup.js`{{execute}}

Follow the prompts in the console to set up your admin and db tokens.

# 2. Verify Credentials

First, install a tool to work with the API endpoints:

`pip3 install httpie-astra`{{execute}}

Make a call to the API using httpie to make sure your credentials are working:

`http --auth-type astra -a default: :/rest/v1/keyspaces`{{execute}}

Pretty cool, right?  But I've set up a config file for you so you can make it even easier.

First, you'll create the directory for the configuration file:

`mkdir -p ~/.config/httpie`{{execute}}

Now, download the config file:

`wget https://raw.githubusercontent.com/synedra-datastax/ExploringStargate/main/config.json -O ~/.config/httpie/config.json`{{execute}}

Try the simpler call to make sure it works:

`http :/rest/v1/keyspaces`{{execute}}

Cool!  Let's get started building the TikTok clone.  
