# ⚒️ HTTPie and Credentials

**Objectives**
In this step, we will:
1. [Install HTTPie](#1-install-httpie) 
2. [Set up credentials](#2-set-up-credentials) for httpie and @astrajs
3. [Verify Credentials](#3-verify-credentials) with HTTPie

---

# 1. Install HTTPie
HTTPie is an excellent API CLI tool, which we've extended to understand the astra authentication model.  

`pip3 install httpie-astra`{{execute}}

## 2. Set Up Credentials

**✅ Step 1: Get the script to set up your environment**

`wget https://raw.githubusercontent.com/synedra-datastax/ExploringStargate/main/env.sh`{{execute}}

**✅ Step 2: Start the env.sh script**

Now you'll run a script which will populate your environment variables in the right places for the tools to use.

`clear; bash env.sh`{{execute}}

It's waiting for you to paste in your variables, so you'll need to get those.

**✅ Step 3: Go back to the [Astra UI](https://astra.datastax.com) and click the **`CONNECT`** button on the line for the database you just created.**

![image](https://user-images.githubusercontent.com/77410784/110701039-853ebb80-81a5-11eb-8a5f-1d6801932321.png)

This will bring you to the `Connect` page.

Scroll down to the configuration block on the right hand side, and click the icon at the top right to copy.
![image](https://user-images.githubusercontent.com/77410784/111052773-e3240b00-8412-11eb-9129-82f6433580f8.png)

Paste in the block from the "connect" screen.

**✅ Step 4: Retrieve and paste your application token**

In the Astra dashboard, click the "Settings tab" for your database.

Set the "Select Role" dropdown to API Admin, and copy the token from the resulting popup.

In the katacoda environment, paste the token to finish setting your credentials.

## 3. Verify Credentials

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
