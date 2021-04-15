# ⚒️ Adding some Content to the Components

# Working with Components
In this step you will work with React Components to understand how they work, returning HTML via the render() function.  Header and FollowersColumn React Components will be created to use in our app.

**Objectives**
1. A Header that is going to be consistent for the upload page and the home page
2. A FollowersColumn column where we can see people that we are currently following
3. A feed and a little box of suggested accounts

---

## Step 1 - Create the Component Files

First up - make a directory and copy new files in
`mkdir src/components`{{execute}}

Create a Header.js file:
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

## Step 3 - Add the Header to index.js

Open `astra-tik-tok/src/index.js`{{open}}

Import the Header component we just created:
<pre class="file" data-filename="astra-tik-toc/src/index.js" data-target="insert"  data-marker="import Home from './pages/Home">
import Header from './components/Header'
import Home from './pages/Home'
</pre>

<pre class="file" data-filename="astra-tik-toc/src/index.js" data-target="insert"  data-marker="index.css">
App.css
</pre>

Add a Header to the App component, under the <HashRouter> tag.
<pre class="file" data-filename="astra-tik-toc/src/index.js" data-target="insert"  data-marker="<HashRouter>">
&lt;HashRouter&gt;
       &lt;Header /&gt;
</pre>

Make sure the header shows up correctly on your <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">site</a>.

## Step 4 - Add the Home Layout to Home.js

Open `astra-tik-tok/src/pages/Home.js`{{open}}

### import FollowersColumn

Add a line at the top of Home.js to import the FollowersColumn component
<pre class="file" data-filename="astra-tik-toc/src/pages/Home.js" data-target="prepend">
import FollowersColumn from '../pages/FollowersColumn'

</pre>

### Add a Container <div>
Your home page layout will be easier to manage if you put the content in a container div.

