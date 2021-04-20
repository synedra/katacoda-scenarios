# ⚒️ Leveling up on Style

We're gonna get some more styled versions of our files and work with them going forward.

`cp /root/step9/components/* /root/astra-tik-tok/src/components`{{execute}}

`cp /root/step9/pages/* /root/astra-tik-tok/src/pages`{{execute}}

`cp /root/step9/App.css /root/astra-tik-tok/src`{{execute}}

`cp /root/step9/index.html /root/astra-tik-tok/public`{{execute}}

## 1. Check the server

Visit the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com">site.</a>

Did everything load up ok?  Great!  Let's connect everything up.

## 2. Update post.js to Return the Right Elements

Open it up: `astra-tik-tok/functions/post.js`{{open}}

<pre class="file" data-filename="astra-tik-toc/functions/post.js" data-target="insert" data-marker="JSON.stringify(res, null, 4)">
JSON.stringify(Object.keys(res).map((i) => res[i]), null, 4)
</pre>

Check the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com/.netlify/functions/post">post endpoint</a> to see the updated return objects.

## 3.  Update Home.js to Use the Cards Correctly

Open it up: `astra-tik-tok/src/pages/Home.js`{{open}}

First let's get all our imports in place.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="prepend">
import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import MiniCard from '../components/MiniCard'
import axios from 'axios'

</pre>

Add the following code to const addData. This enables you to POST to your database using the addData Netlify function.  It also:
* Sets up descendingUsers and topFiveFollowing to use with the different cards
* Calls the addData endpoint to add data to the system
* Fetches data from the 'post' endpoint to populate the page

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="const Home = () => {">
const Home = () => {
    const [users, setUsers] = useState(null)  
    let descendingUsers
    let topFiveFollowing

    //auto populating with dummy data
    const addData = async () => {
        await axios.post('/.netlify/functions/addData')
    }

    //fetch all the tik-tok posts to your feed
    const fetchData = async () => {
        const results = await axios.get('/.netlify/functions/post')
        console.log(results.data)
        setUsers(results.data)
    }

    useEffect(() => {
        addData()
        fetchData()
    }, []
  
</pre>

Since data can be added to the database with this Netlify function, you will need to provide a way to fetch data so that it can be seen in the app. Make a GET request to the Netlify posts function. You can console.log the data retrieved if you like, and setUsers to the returned data as well so that it can be used later. Set the data as users instead of posts this time.

Use an Effect hook and invoke addData and fetchData, and return an empty array for now.

Check <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com/">the site</a> in your browser.

## 4. Add Sorting Logic

Now there is data coming in and out of Astra.  But you’ll want to sort your posts (users) based on descending id order. This can be achieved through filtering. Under useEffect()in Home.js, add the following snippet to sort the posts/users (if they exist). 

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="return">

  if (users) {
    descendingUsers = users.sort((a, b) => a.id < b.id ? 1 : -1)
    const following = users.filter(user => user.is_followed)
    const descendingFollowing = following.sort((a, b) => a.likes < b.likes ? 1 : -1)
    topFiveFollowing = descendingFollowing.slice(0, 5)
  }

  return
</pre>

With the users now in descending order, go ahead and map them. First, make sure that the elements only render if we get the ordered data back from the database.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="return">
return (
  &lt;&gt;
  {descendingUsers && (
</pre>

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="</>">
  )}
  &lt;/&gt;
</pre>

Then in the feed, start mapping onto a Card component. Once again, use descendingUsers. Use the map()function to map each descendingUser (singular) and its index onto a Card component. 

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="<div className='feed'>">
<div className='feed'>
      {descendingUsers.map((descendingUser, index) => (
          &lt;Card
            key={index}
            user={descendingUser}
          /&gt;
        ))}
</pre>

Tell Home.js that we want to pass the topFiveFollowing variable into FollowersColumn.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="<FollowersColumn />">
&lt;FollowersColumn users={topFiveFollowing} /&gt;</pre>

## 5. Update Card.js with Personalization

Open it up: `astra-tik-tok/src/components/Card.js`{{open}}

The user needs to be passed in into Card.js. 

<pre class="file" data-filename="astra-tik-toc/src/components/Card.js" data-target="insert" data-marker="const Card = () => {">
const Card = ({ user }) => {
  console.log('user', user)
</pre>

Once again, visit the Visit the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com">home page</a> in the browser. You will see the card appear 4 times because we have 4 users. All the cards look generic at this point. 

## 5. Following Users

The next thing to do is to  populate the "Following" and "Suggested Accounts" side columns as well. This means working on the MiniCard and MicroCard, which is very similar to what you have just done with the Card component.

First, though, open `astra-tik-tok/src/components/Card.js`{{open}} 

Now that you have the people that you are following stored in the const following, you will need to sort them by descending order. The descendingFollowing constant uses a similar syntax to what was used for descendingUsers, except “likes”, as the users with the most likes should be the ones popping up as suggestions.

Now we need to make a change to `astra-tik-tok/src/components/FollowersColumn.js`

<pre class="file" data-filename="astra-tik-toc/src/components/FollowersColumn.js" data-target="insert" data-marker="const Card = () => {">
const Card = ({ user }) => {
  console.log('user', user)
</pre>

## 5. Update FollowersColumn.js

Open it up: `astra-tik-tok/src/components/FollowersColumn.js`{{open}}


