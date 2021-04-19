# ⚒️ Netlify Data Interaction

Now you're going to put some fake data into the system to see how it works.

## 1. Fetch the data file

In `astra-tik-tok/functions/addData.js`{{open}} we want to pull in data from the 'data.json' file in your /root directory.

<pre class="file" data-filename="astra-tik-toc/functions/addData.js" data-target="replace">

const { createClient } = require("@astrajs/collections")

const collection = 'posts'

exports.handler = async function (event, context, callback) {
    const fs = require('fs')
      const astraClient = await createClient({
       astraDatabaseId: process.env.ASTRA_DB_ID,
       astraDatabaseRegion: process.env.ASTRA_DB_REGION,
       applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
     });

  const posts = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection(collection)

    const data = JSON.parse(fs.readFile('data.json'))

  try {
        for (let i = 0; i < data.length; i++) {
          await posts.create(data[i].id.toString(), data[i])
        }

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
}

}   
</pre> 

Visit the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com/.netlify/functions/addData">addData endpoint.</a>

Then check the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com/.netlify/functions/post">post endpoint</a> to see the added data.


It's time to put some real content in there!  First, do a github checkpoint for safety.

`git commit -a -m "Step 8 final"`{{execute}}

`git tag -a STEP7 -m "Step 8 final"`{{execute}}

