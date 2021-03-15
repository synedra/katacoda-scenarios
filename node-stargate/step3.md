# Exploring Stargate APIs from the command line

In this section you will use our httpie configuration to take a look at the Stargate APIs.  In this section we will use the REST API

* [REST - Create a Table](#1.-create-a-table)
* [REST - Add some rows](#2.-add-some-rows)
* [REST - Find the rows](#3.-find-the-rows)
* [REST - Delete the rows](#4.-delete-the-rows)
* [REST - Delete the table](#5.-delete-the-table)

### 1. Create a table

The first thing that needs to happen is to create a table.  HTTPie will handle the authentication and create the right server based on your .astrarc file, but you'll need to make sure and use that "Workshop" keyspace.

`http POST :/rest/v2/schemas/keyspaces/Workshop/tables json:='{
  "name": "cavemen",
  "ifNotExists": false,
  "columnDefinitions": [
    {
      "name": "firstname",
      "typeDefinition": "text",
      "static": false
    },
    {
      "name": "lastname",
      "typeDefinition": "text",
      "static": false
    }
  ],
  "primaryKey": {
    "partitionKey": [
      "lastname"
    ],
    "clusteringKey": [
      "firstname"
    ]
  }
}'`{{execute}}

Just to be sure, go ahead and ask for a listing of the tables in the Workshop keyspace:

`http :/rest/v2/schemas/keyspaces/Workshop/tables`{{execute}}

## 2. Add some rows
Great!  The table is created.  But it's kind of dull with no data.  Since it's looking for firstname and lastname, add a few different rows with that data.

`http POST :/rest/v2/keyspaces/Workshop/cavemen json:='
{
            "firstname" : "Fred",
            "lastname": "Flintstone"
}'`{{execute}}


## 3. Find the rows
## 4. Delete the rows
## 5. Delete the table
