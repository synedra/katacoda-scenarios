# ⚒️ HTTPie and Credentials

**Objectives**
In this step, we will:
1. Install HTTPie
2. Set up credentials
3. Verify Credentials

---

# 0. Setup npm modules

Make sure you've got current versions.

* `sudo npm install`{{execute}}

Install the astra-setup npm package.

* `sudo npm install --unsafe-perm -g astra-setup`{{execute}}



# 1. Install HTTPie
HTTPie is an excellent API CLI tool, which we've extended to understand the astra authentication model.  

`pip3 install httpie-astra`{{execute}}

## 2. Set Up Credentials

`/usr/bin/astra-setup stargate workshop`{{execute}}

It's waiting for you to paste in your variables, so you'll need to get those.



## 3. Verify Credentials

Make a call to the API using httpie to make sure your credentials are working:

`http --auth-type astra -a default: :/rest/v1/keyspaces`{{execute}}

We've actually got an httpie config file so we can skip the auth-type stuff.

Try the simpler call to make sure it works:

`http :/rest/v1/keyspaces`{{execute}}

Great, it's time to dive deeper into the Stargate APIs to see what they can do for you.
