# Exploring Stargate APIs from the command line - Document API

In this section you will use our httpie configuration to take a look at the Stargate APIs.  In this section we will use the Document API.  This API deserves a little more explanation, as it is not what you might think of as a standard Cassandra database.  In this API, you give the database JSON objects and can then work with them based on their contents.  This database model doesn't require a schema, it just has the documents you put in there, which are placed in collections that you define.

* [Document - Choose a Namespace](#1.-create-a-namespace)
* [Document - Write a Document](#2.-write-a-document)
* [Document - Read documents](#3.-read-documents)
* [Document - Update documents](#4.-Update-documents)

### 1. Choose a namespace

Before you get started, you'll need to grab a list of your namespaces in order to figure out the right path to use.

`http :/rest/v2/schemas/namespaces | jq ".data[].name"`{{execute}}

Hey, look!  There's our friend 'workshop'.  A namespace is just a different way to organize data, and your keyspace is right there.  In fact, your keyspace should be in your environment variables, but just to check, try this:

`cat ~/.astrarc | grep KEYSPACE`{{execute}}

If that says "workshop" you're good to go, you'll get that for free as the KS placeholder in the queries.

Otherwise just edit that file (it's in your current directory) to change the KEYSPACE to 'workshop'.

## 2. Write a document

OK, let's get some cavemen in there!  The collection name will be auto-created when you add the document, so it doesn't have to exist ahead of time.  We'll use the KS shortcut to grab the keyspace from our credentials resource file.

`http POST :/rest/v2/namespaces/KS/collections/cavemen json:='{"firstname": "Fred", "lastname": "Flintstone"}'`{{execute}}

Hmm, that document ID isn't easy to use, let's go ahead and specify one explicitly for Barney.

`http PUT :/rest/v2/namespaces/KS/collections/cavemen/BarneyRubble json:='{"firstname": "Barney", "lastname": "Rubble"}'`{{execute}}

Let's make sure our documents were written correctly:

`http :/rest/v2/namespaces/KS/collections/cavemen page-size==5`{{execute}}

## 3. Read documents

IF you know the ID of your document, it's easy to see what's there:

`http :/rest/v2/namespaces/KS/collections/cavemen/BarneyRubble`{{execute}}

But where is Fred?  I didn't write down his document ID!  You can get the Document ID for anything by querying the values in the document.

`http GET :/rest/v2/namespaces/KS/collections/cavemen where:='{"firstname": "Fred"}'`{{execute}}

The "where" clause is really powerful, and allows you to combine different elements to really zero in on the document you want.

You can even get just a subset of the document by specifying a particular section in the path.

`http :/rest/v2/namespaces/KS/collections/cavemen/BarneyRubble/firstname`{{execute}}

and you can use "where" to specify a range of documents:

`http GET :/rest/v2/namespaces/KS/collections/cavemen/BarneyRubble where:='{"lastname": {"$gt": "Flintstone"}}'`{{execute}}

## 3. Update documents

So now we have Fred and Barney, but once again we haven't given Fred a job.  He just annoys Wilma when he hangs out at home, so that won't do at all.

Here's how you give Fred a job and get him out of Wilma's hair.  Remember, we just got his ID a few commands ago.  Let's grab it again and set it in the environment so we can use it as we like.

This is how to set an environment variable to make this easy.

```export DOCUMENT_ID=$(http :/rest/v2/namespaces/KS/collections/cavemen where:='{"firstname": "Fred"}' | jq ".documentId")```

Again, giving Fred a job. Wilma thanks you.

`http PATCH :/rest/v2/namespaces/KS/collections/cavemen/$DOCUMENT_ID json:='{"firstname":"Fred","lastname":"flintstone","occupation":"Quarry Screamer"}'`{{execute}}


`http POST :/graphql/workshop query='
mutation updatecavemen {
  fred: updatecavemen(value: {firstname:"Fred",lastname:"Flintstone",occupation:"Quarry Screamer"}, ifExists: true ) {
    value {
      firstname
    }
  }
}'`{{execute}}

Check our work:
`http POST :/graphql/workshop query='
    query cavemen {
    cavemen(filter: {lastname: {in: ["Rubble", "Flintstone"]}}) {
    values {firstname}
}}'`{{execute}}

## 4. Delete the rows

Barney's not really adding a lot of value.  Let's kick him out:
`http POST :/graphql/workshop query='
mutation deletecavemen {
  barney: deletecavemen(value: {firstname:"Barney",lastname:"Rubble"}, ifExists: true ) {
    value {
      firstname
    }
  }
}'`{{execute}}

So wait, is he gone?

`http POST :/graphql/workshop query='
    query cavemen {
    cavemen(filter: {lastname: {in: ["Rubble", "Flintstone"]}}) {
    values {firstname}
}}'`{{execute}}

## 5. Delete the table

We don't need our table anymore, let's delete it.  We need to use the REST API for this.

`http DELETE :/rest/v2/schemas/keyspaces/workshop/tables/cavemen`{{execute}}

Double checking - what tables are in my keyspace?

`http :/rest/v2/schemas/keyspaces/workshop/tables`{{execute}}

Now you can move on and check out the GraphQL API.