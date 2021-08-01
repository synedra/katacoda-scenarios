# ⚒️ Let's get Routing!

# Routing Pages
Routing is the ability to move between different parts of an application when a user enters a URL or clicks an element.

**Objectives**
1. Add routing with react-router-dom
2. Create a Home and Upload component page
3. Update App.js with routes for components

---

# 1. Install the routing module

Install the react-router-dom package:
`yarn add react-router-dom`{{execute}}

Open `astra-tik-tok/src/App.js`{{open}}

Add the following import statement to your App.js file.
<pre class="file" data-filename="astra-tik-tok/src/App.js" data-target="prepend">import { HashRouter, Route , Switch} from 'react-router-dom'</pre>

# 2. Create component pages

Now you need to create component pages for your Home and Upload components.

Create the directory for the pages and touch the files.
`mkdir -p src/pages; touch src/pages/Home.js; touch src/pages/Upload.js`{{execute}}

Open the `astra-tik-tok/src/pages/Home.js`{{open}} file.

Update the contents:
<pre class="file" data-filename="root/astra-tik-tok/src/Home.js" data-target="replace">
import '../App.css'
const Home = () => {
  return (
    &lt;div className="Home"&gt;
    &lt;/div&gt;
  );
}
export default Home
</pre>

Open the `astra-tik-tok/src/pages/Upload.js`{{open}} file.

Update the contents:
<pre class="file" data-filename="root/astra-tik-tok/src/Upload.js" data-target="replace">
import '../App.css'
const Upload = () => {
  return (
    &lt;div className="Upload"&gt;
    &lt;/div&gt;
  );
}
export default Upload
</pre>

## Add structure to App.js

It's time to get App.js ready to do some real work.

You'll be making a few changes with this:
* Importing the HashRouter, Route and Switch components
* Adding a &lt;Hashrouter&gt; at the top of your App component
* In the &lt;Hashrouter&gt;, inserting a Switch component to direct queries to the right place
* Setting up routes for the home and upload pages.  Note you always want to have more specific routes (like /upload) first, then your more general matches later.  The first match "wins" so you can land in some frustration if you don't keep this in mind.

Open `astra-tik-tok/src/App.js`{{open}} to get started.

<pre class="file" data-filename="astra-tik-toc/src/App.js" data-target="replace">
import { HashRouter, Route , Switch} from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import './App.css'

const App = () => {
  return (
    &lt;HashRouter&gt;
    &lt;Switch&gt;
      &lt;Route path= "/upload" component={Upload}/&gt;
      &lt;Route path= "/" component={Home}/&gt;
    &lt;/Switch&gt;
  &lt;/HashRouter&gt;
  );
}

export default App
</pre>

Check in your original terminal to make sure your site is still running as expected by clicking the "Terminal" tab in the bottom of the IDE.  

Go ahead and <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">visit it</a>.  If you go to the <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/upload">upload</a> endpoint, you will get a different blank page.  Anything else will default to '/' (Home).  


Awesome!  We don't have any content yet, so the pages aren't much to look at.  Let's take care of that next!

Before we move on, go ahead and commit your step 4 work:

`git add src/pages`{{execute}}

`git commit -a -m "Step 4 final"`{{execute}}

`git tag -a STEP4 -m "Step 4 final"`{{execute}}


