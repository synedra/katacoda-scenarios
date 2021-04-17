# ⚒️ Adding some Content to the Components

In this step you will work with React Components to understand how they work, returning HTML via the render() function.  Header and FollowersColumn React Components will be created to use in our app.

**Objectives**
1. A Header that is going to be consistent for the upload page and the home page
2. A FollowersColumn column where we can see people that we are currently following
3. A feed and a little box of suggested accounts

---

## Step 1 - Create the Component Files

First up - make a directory and copy new files in
`mkdir src/components; touch src/components/Header.js; touch src/components/FollowersColumn.js`{{execute}}

Populate your Header file:

Open `astra-tik-tok/src/components/Header.js`{{open}}

<pre class="file" data-filename="root/astra-tik-tok/components/Header.js" data-target="replace">
const Header = () => {
    return (
      &lt;div className="header"&gt;
          &lt;h1>Header&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
  
export default Header
</pre>

Open `astra-tik-tok/src/components/FollowersColumn.js`{{open}}

<pre class="file" data-filename="root/astra-tik-tok/components/FollowersColumn.js" data-target="replace">
const FollowersColumn = () => {
    return (
      &lt;div className="followers-column"&gt;
          &lt;h1>FollowersColumn&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
  
export default FollowersColumn
</pre>

## Step 2 - Style the Components in App.css

Open `astra-tik-tok/src/App.css`{{open}}

Change the contents to do a couple of things:
1. Set the background-color to yellow in the header class
2. Set css attributes for the .followers-column class

<pre class="file" data-filename="root/astra-tik-tok/src/App.css" data-target="replace">
.App {
  text-align: center;
}

.header {
  background-color: yellow;
}

.followers-column {
  background-color: red;
  width: 500px;
  height: 800px;
}
</pre>

## Step 3 - Add the Header to App.js

Open `astra-tik-tok/src/App.js`{{open}}

Import the Header component we just created:
<pre class="file" data-filename="astra-tik-toc/src/App.js" data-target="prepend">
import Header from './components/Header</pre>

Open `astra-tik-tok/src/App.js`{{open}}
Add a Header to the App component, under the <HashRouter> tag.
<pre class="file" data-filename="astra-tik-toc/src/App.js" data-target="insert"  data-marker="<HashRouter>">
&lt;HashRouter&gt;
       &lt;Header /&gt;
</pre>

Make sure the header shows up correctly on your <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">site</a>.

## Step 4 - Add the Home Layout to Home.js

Open `astra-tik-tok/src/pages/Home.js`{{open}}

*import FollowersColumn* - Add a line at the top of Home.js to import the FollowersColumn component
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="prepend">
import FollowersColumn from '../components/FollowersColumn'</pre>

*Add a Container <div>* - Your home page layout will be easier to manage if you put the content in a container div.
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker='<div className="Home">'>
&lt;div className="container"&gt;</pre>

*Add FollowersColumn* - Add the FollowersContainer component into the container div.
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker='<div className="container">'>
&lt;div className="container"&gt;
        &lt;FollowersColumn /&gt;</pre>

*Add feed div* - Let's put a feed div in there as well, and move the home page H1 into that component.
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker='<FollowersColumn />'>
&lt;FollowersColumn /&gt;
        &lt;div className="feed"&gt; 
            &lt;h1&gt;Home&lt;/h1&gt;
        &lt; /div &gt;
</pre>

*Add suggested-box div* - create a place for a suggestion box to appear.
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="insert" data-marker='<h1>Home</h1>'>
            &lt;h1&gt;Home&lt;/h1&gt;
                    &lt; /div &gt;
            &lt;div className="suggested-box"&gt;</pre>

If any of those didn't work, you can create it from scratch.
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="replace">
import FollowersColumn from '../components/FollowersColumn'

const Home = () => {
  return (
        &lt;div className="container"&gt;
                &lt;FollowersColumn /&gt;
                &lt;div className="feed"&gt; 
                    &lt;h1&gt;Home&lt;/h1&gt;
                &lt; /div &gt;
            &lt;div className="suggested-box"&gt;&lt; /div &gt;
        &lt;/div&gt;
  );
}

export default Home
</pre>

## Step 4 - Style the Components
You need to make your new components pretty.
* Add the flex styling to the container
* Make the feed white
* Make the suggested-box blue. 

Open `src/App.css`{{open}}

In this file, add the new components to the end.

<pre class="file" data-filename="astra-tik-toc/src/App.css" data-target="append">
.container {
  display: flex;
  flex-direction: row;
}

.feed {
  background-color: white;
  width: 500px;
}

.suggested-box {
  background-color: blue;
  width: 400px;
  height: 400px;
}

</pre>

## Step 5 - Check your Site

<a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">Visit</a> your site to make sure the CSS is being rendered as you want.  It should look like this:
![image](https://user-images.githubusercontent.com/77410784/114914386-11f91c80-9dd7-11eb-8e8c-17f055f3fc49.png)

Not super stylish yet but we can see how the components are placed relative to each other.