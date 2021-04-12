# ⚒️ HTTPie and Credentials

**Objectives**
In this step, we will:
1. Set up credentials
3. Verify Credentials

---

# 1. Get API and DB tokens
HTTPie is an excellent API CLI tool, which we've extended to understand the astra authentication model.  

## 2. Set Up Credentials

**✅ Step 1: Get the script to set up your environment**

`wget https://raw.githubusercontent.com/synedra-datastax/ExploringStargate/main/env.sh`{{execute}}

**✅ Step 2: Start the env.sh script**

Now you'll run a script which will populate your environment variables in the right places for the tools to use.

`clear; bash env.sh`{{execute}}

It's waiting for you to paste in your variables, so you'll need to get those.

**✅ Step 4: Retrieve and paste your application token**

In the Astra dashboard, click the "Settings tab" for your database.

Set the "Select Role" dropdown to Database Administrator and click "Generate Token", and copy the "Token" from the resulting popup.  Paste that at the prompt and hit enter.

Next, set the "Select Role" dropdown to API Admin User and click "Generate Token", and copy the "Token" from the resulting popup. Paste at the prompt and hit enter.

## 3. Verify Credentials

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

Great, it's time to dive deeper into the Stargate APIs to see what they can do for you.
