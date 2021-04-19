# ⚒️ Netlify Functions

You're ready to start leveraging Netlify functions to interact with the database!

## 1. Create the directory structure

First, create a directory for netlify functions.  The default is 'functions' so let's use that, and set up the first function for editing.

`mkdir src/functions; touch src/functions/addData.js; touch src/components/FollowersColumn.js`{{execute}}

## 2. Create addData.js

There is a little more syntax to be added to support Netlify functions. Each JavaScript file to be deployed as a synchronous, serverless Lambda function must export a handler method with the following general syntax. Check out the [Netlify docs on Synchronous function format](https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format) for an in-depth explanation of how this works.

For now, open {{Open `astra-tik-tok/src/functions/addData.js`{{open}}}}

Let's populate it with some data.  We want to use the @astrajs/collections library to create an astra client

<pre class="file" data-filename="astra-tik-toc/src/functions/addData.js" data-target="replace">
const { createClient } = require("@astrajs/collections")

const collection = 'posts'

exports.handler = async function (event, context, callback) {
      const astraClient = await createClient({
       astraDatabaseId: process.env.ASTRA_DB_ID,
       astraDatabaseRegion: process.env.ASTRA_DB_REGION,
       applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
     });

  const posts = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection(collection)
}    
</pre>


