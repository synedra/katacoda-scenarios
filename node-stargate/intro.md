# 📚 Datastax: Cassandra, Astra and Stargate

If you are already familiar with our Cassandra stack and just want to move on to the first exercise go to the next section => ⚒️ [Create Astra Instance](LAB1_Create_astra). Otherwise, read on.

## 1. Top Level Overview of the Astra Stack

> *Sources [Cassandra Documentation](https://cassandra.io), [Astra Documentation](https://docs.datastax.com/en/astra/docs/) and [Stargate Documentation](https://stargate.io/docs/stargate/1.0/quickstart/quickstart.html)*



**🔵 Cassandra:**  is the NoSQL Open Source Database which is the foundation of the stack.  Cassandra powers many extremely large and demanding databases for enterprises around the world, and is the best option for companies needing scalability and performance.

**🔵 Astra:**  provides a serverless instance of Cassandra.  This comes with a free $25/month credit, providing a significant amount of data and transactions.  You're charged only for what you use, and there's no credit card needed.

**🔵 Stargate:**  is an open source engine to provide APIs for Cassandra databases.  It's available free for your use, and comes with every Astra instance.

---
## 2. Cassandra Details
![ok](https://github.com/synedra-datastax/ExploringStargate/blob/main/images/Overview0.png?raw=true)

**🔵 NoSQL:**  Cassandra is a NoSQL database.  Unlike many other systems, by default it requires a schema (the Stargate Document API does not require a schema).  There is a CQL query language for working with Cassandra.  CQL does not handle joins, and transactions are unbelievably fast.

**🔵 Nodes:**  Cassandra is designed to be distributed.  You decide how many nodes you need, and you can introduce them into your instance without any downtime.  Each node can handle thousands of transactions per second per core, and every node can handle any query.  Nodes keep each other up to date by something called "gossiping", making sure your data stays current.

**🔵 Datacenters:**  Cassandra can have many nodes per datacenter, and as many data centers as you like.

**🔵 Use cases:** Here's a high level overview of the use cases where Cassandra really shines.
![ok](https://github.com/synedra-datastax/ExploringStargate/blob/main/images/Overview1.png?raw=true)

---
## 3. Astra Information
![ok](https://github.com/synedra-datastax/ExploringStargate/blob/main/images/Overview2.png?raw=true)

**🔵 Serverless:**  Scale up or down without doing any work.  Just work with your data, and leave the ops to us.

**🔵 Free tier:** We replaced our free tier with a $25/month credit which gets you a great deal of bandwidth and storage for experimenting and running small applications.

**🔵 Stargate:**  All Cassandra instances come with Stargate included.

---

#### Ok, let's move on and get into our first lab, where we get our Astra instance.