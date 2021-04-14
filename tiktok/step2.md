# ⚒️ Credentials

**Objectives**
In this step, we will:
1. Set up credentials
3. Verify Credentials

---

# 1. Prepare the environment
Change into the setup directory.

`cd setup`{{execute}}

Run 'npm install' to get requirements.

`npm install; clear`{{execute}}

Run setup.js

`node setup.js`{{execute}}

Follow the prompts in the console to set up your admin and db tokens.

Change back into the main directory

`cd ..`{{execute}}

# 2. Verify Credentials

First, install a tool to work with the API endpoints:

`pip3 install httpie-astra`{{execute}}

Make a call to the API using httpie to make sure your credentials are working:

`http --auth-type astra -a default: :/rest/v1/keyspaces`{{execute}}

Pretty cool, right?  Let's configure httpie to work exactly how you want, you we don't have to specify the auth-type and .astrarc section.

First, you'll create the directory for the configuration file:

`mkdir -p ~/.config/httpie`{{execute}}

Now, download the config file:

`wget https://raw.githubusercontent.com/synedra-datastax/ExploringStargate/main/config.json -O ~/.config/httpie/config.json`{{execute}}

Try the simpler call to make sure it works:

`http :/rest/v1/keyspaces`{{execute}}

Cool!  Let's get started building the TikTok clone.  
