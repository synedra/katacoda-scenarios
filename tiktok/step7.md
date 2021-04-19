# ⚒️ Netlify Functions

You're ready to start leveraging Netlify functions to interact with the database!

## 1. Create the directory structure

First, create a directory for netlify functions.  The default is 'functions' so let's use that, and set up the first function for editing.

`mkdir functions; touch functions/addData.js; touch functions/post.js`{{execute}}

## 2. Create addData.js

There is a little more syntax to be added to support Netlify functions. Each JavaScript file to be deployed as a synchronous, serverless Lambda function must export a handler method with the following general syntax. Check out the [Netlify docs on Synchronous function format](https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format) for an in-depth explanation of how this works.

For now, open `astra-tik-tok/functions/addData.js`{{open}}

Let's populate it with some data.  We want to use the @astrajs/collections library to create an astra client

<pre class="file" data-filename="astra-tik-toc/functions/addData.js" data-target="replace">
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

Now, we need to build a configuration file to tell netlify exactly what to do.

Create it: `touch netlify.toml`{{execute}}

Open it: `astra-tik-tok/netlify.toml`{{open}}

<pre class="file" data-filename="astra-tik-toc/netlify.toml" data-target="replace">
[build]
command = "npm run build"
functions = "functions"
publish = "build"
</pre>

Click back to `astra-tik-tok/functions/addData.js`{{open}}

<pre class="file" data-filename="astra-tik-toc/functions/addData.js" data-target="insert" data-marker=".collection(collection)
">
.collection(collection)

  try {
      await posts.create("a post", {
          title: "my first post",
      })

      return {
          statusCode: 200,
      }
  } catch (e) {
      console.error(e);
      return {
          statusCode: 500,
          body: JSON.stringify(e),
      }
  }
</pre>

Now let's populate post.js:

Open it up: `astra-tik-tok/functions/post.js`{{open}}

<pre class="file" data-filename="astra-tik-toc/functions/post.js" data-target="replace">
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

Now let's create a post:

<pre class="file" data-filename="astra-tik-toc/functions/post.js" data-target="insert" data-marker=".collection(collection)
">
.collection(collection)

  try {
      const res = await posts.find({})

      return {
          statusCode: 200,
          body: JSON.stringify(res, null, 4)
      }
  } catch (e) {
      console.error(e);
      return {
          statusCode: 500,
          body: JSON.stringify(e),
      }
  }
</pre>

Make sure that terminal 1 is using `npx netlify dev`{{execute}}

Visit the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com/.netlify/functions/addData">addData endpoint.</a>

Then check the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com/.netlify/functions/post">post endpoint.</a>

You should see this:
`{
    "a post": {
        "title": "my first post"
    }
}`

Awesome, we're ready to start putting more data in the database.  First, do a github checkpoint for safety.

`git add functions`{{execute}}

`git commit -a -m "Step 7 final"`{{execute}}

`git tag -a STEP7 -m "Step 7 final"`{{execute}}

