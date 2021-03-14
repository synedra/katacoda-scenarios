# Exploring Stargate APIs from the command line

In this section you will use our httpie configuration to take a look at the Stargate APIs.

* Create a Table
* Add some rows
* Find the rows
* Update the rows
* Delete the rows
* Delete the table.

**1. Create a table**

The first thing that needs to happen is to create a table.  HTTPie will handle the authentication and create the right server based on your .astrarc file, but you'll need to make sure and use that "Workshop" keyspace.

`http POST :/rest/v2/schemas/keyspaces/Workshop/tables json:='{
    "ifNotExists": false,
    "columnDefinitions": [
        {
            "static": false,
            "name": "id",
            "typeDefinition": "text"
        },
        {
            "static": false,
            "name": "value",
            "typeDefinition": "text"
        }
    ],
    "primaryKey": {"partitionKey": ["id"]},
    "tableOptions": {"defaultTimeToLive": 0},
    "name": "demo_table"
}`{{execute}}