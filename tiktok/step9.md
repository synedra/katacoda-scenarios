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

<pre class="file" data-filename="astra-tik-toc/functions/post.js" data-target="insert" data-marker="statusCode: 200">
statusCode: 200,
    body: JSON.stringify(Object.keys(res).map((i) => res[i]), null, 4)
</pre>

Check the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com/.netlify/functions/post">post endpoint</a> to see the updated return objects.

## 3.  Update Home.js to Use the Cards Correctly

Open it up: `astra-tik-tok/src/pages/Home.js`{{open}}

First let's get all our imports in place.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="prepend">
import Card from '../components/Card'
import MiniCard from '../components/MiniCard'
import axios from 'axios'
</pre>

Add the following code to const addData. This enables you to POST to your database using the addData Netlify function.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="const Home = () => {">
const Home = () => {

  //auto populating with dummy data
  const addData = async () => {
    await axios.post('/.netlify/functions/addData')
  }
</pre>

Since data can be added to the database with this Netlify function, you will need to provide a way to fetch data so that it can be seen in the app. Make a GET request to the Netlify posts function. You can console.log the data retrieved if you like, and setUsers to the returned data as well so that it can be used later. Set the data as users instead of posts this time.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="const Home = () => {">
const Home = () => {    
    const [users, setUsers] = useState()
</pre>

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="return">

//fetch all the tik-tok posts to your feed
  const fetchData = async () => {
    const results = await axios.get('/.netlify/functions/post')
    console.log(results.data)
    setUsers(results.data)
  }
  
   return
</pre>

Use an Effect hook and invoke addData and fetchData, and return an empty array for now.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="return">

  useEffect(() => {
    addData()
    fetchData()
  }, [])
  
   return
</pre>

Set the initial state of users and setUsers to null (no users) to start. 
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="useState()">
useState(null)
</pre>

Check <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">the site</a> in your browser.

## 4. Add Sorting Logic

Now there is data coming in and out of Astra.  But you’ll want to sort your posts (users) based on descending id order. This can be achieved through filtering. Under useEffect()in Home.js, add the following snippet to sort the posts/users (if they exist). 

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="return">

  if (users) {
  descendingUsers = users.sort((a, b) => a.id < b.id ? 1 : -1)
  }

  return
</pre>

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="const Home = () => {">
const Home = () => {    
    let descendingUsers
</pre>

With the users now in descending order, go ahead and map them. First, make sure that the elements only render if we get the ordered data back from the database.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="return">
return (
  <>
  {descendingUsers && (
</pre>

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="</>">
  )}
  </>
</pre>

Then in the feed, start mapping onto a Card component. Once again, use descendingUsers. Use the map()function to map each descendingUser (singular) and its index onto a Card component. 

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="<div className='feed'>">
<div className='feed'>
      {descendingUsers.map((descendingUser, index) => (
          <Card
            key={index}
            user={descendingUser}
          />
        ))}
</pre>

## 5. Update Card.js with Personalization

Open it up: `astra-tik-tok/src/components/Card.js`{{open}}

The user needs to be passed in into Card.js. 

<pre class="file" data-filename="astra-tik-toc/src/components/Card.js" data-target="insert" data-marker="const Card = () => {">
const Card = () => {

const Card = ({ user }) => {
  console.log('user', user)
</pre>

Once again, visit the Visit the <a href="https://[[HOST_SUBDOMAIN]]-8888-[[KATACODA_HOST]].environments.katacoda.com">home page</a> in the browser. You will see the card appear 4 times because we have 4 users. All the cards look generic at this point. 

## 5. Following Users

The next thing to do is to  populate the "Following" and "Suggested Accounts" side columns as well. This means working on the MiniCard and MicroCard, which is very similar to what you have just done with the Card component.

First, though, open astra-tik-tok/src/pages/Home.js`{{open}} back up

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="descendingUsers = users.sort((a, b) => a.id < b.id ? 1 : -1)">
descendingUsers = users.sort((a, b) => a.id < b.id ? 1 : -1)
const following = users.filter(user => user.is_followed)
</pre>

Now that you have the people that you are following stored in the const following, you will need to sort them by descending order. Create the descendingFollowing constant by using a similar syntax to what was used for descendingUsers, except “likes”, as the users with the most likes should be the ones popping up as suggestions.

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="const following = users.filter(user => user.is_followed)">
const following = users.filter(user => user.is_followed)
const descendingFollowing = following.sort((a, b) =&gt; a.likes &lt; b.likes ? 1 : -1)
</pre

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker='const descendingFollowing = following.sort((a, b) =&gt; a.likes &lt; b.likes ? 1 : -1'>

const descendingFollowing = following.sort((a, b) =&gt; a.likes &lt; b.likes ? 1 : -1)
  topFiveFollowing = descendingFollowing.slice(0, 5)
</pre>

<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker="let descendingUsers">
let descendingUsers   
    let topFiveFollowing
</pre>
