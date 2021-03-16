# Exploring Stargate APIs from the command line - Document API

In this section you will use our httpie configuration to take a look at the Stargate APIs.  In this section we will use the Document API.  This API deserves a little more explanation, as it is not what you might think of as a standard Cassandra database.  In this API, you give the database JSON objects and can then work with them based on their contents.  This database model doesn't require a schema, it just has the documents you put in there, which are placed in collections that you define.

* [Document - Choose a Namespace](#1.-create-a-namespace)
* [Document - Write a Document](#2.-write-a-document)
* [Document - Read documents](#3.-read-documents)
* [Document - ](#4.-delete-the-rows)
* [GraphQL - Delete the table](#5.-delete-the-table)

### 1. Choose a namespace

Before you get started, you'll need to grab a list of your namespaces in order to figure out the right path to use.

`http :/rest/v2/schemas/namespaces | jq ".data[].name"`{{execute}}

Hey, look!  There's our friend 'workshop'.  A namespace is just a different way to organize data, and your keyspace is right there.  In fact, your keyspace should be in your environment variables, but just to check, try this:

`cat ~/.astrarc | grep KEYSPACE`{{execute}}

If that says "workshop" you're good to go, you'll get that for free as the KS placeholder in the queries.

Otherwise just edit that file (it's in your current directory) to change the KEYSPACE to 'workshop'.

## 2. Write a document



`http POST :/graphql/workshop query='
mutation insertcavemen {
  barney: insertcavemen(value: {firstname:"Barney", lastname: "Rubble"}) {
    value {
      firstname
    }
  }
}'`{{execute}}

`http POST :/graphql/workshop query='
mutation insertcavemen {
  fred: insertcavemen(value: {firstname:"Fred", lastname: "Flintstone"}) {
    value {
      firstname
    }
  }
}'`{{execute}}

Check to make sure Barney's really in there:
http POST :/graphql/workshop query='
query getCaveman {
    cavemen (value: {lastname:"Rubble"}) {
      values {
      	lastname
      }
    }
}'`{{execute}}

## 3. Update the rows

Again, giving Fred a job.

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