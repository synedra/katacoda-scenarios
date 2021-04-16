# ⚒️ Let's get Routing!

# Routing Pages
Routing is the ability to move between different parts of an application when a user enters a URL or clicks an element.

**Objectives**
1. Add routing with react-router-dom
2. Create a Home and Upload component page
3. Update index.js with routes for components and the App definition

---

# 1. Install the routing module

Install the react-router-dom package:
`yarn add react-router-dom`{{execute}}

Open `astra-tik-tok/src/index.js`{{open}}

Add the following import statement to your index.js file.
<pre class="file" data-filename="astra-tik-tok/src/index.js" data-target="prepend">import { HashRouter, Route , Switch} from 'react-router-dom'</pre>

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

## Update index.js

It's time to make some changes to index.js.  Instead of keeping the App component in its own file we'll bring it into here for easier maintenance.

In the index.js file, change the imports.  This will remove the App.js import command and add imports for Home and Upload, and set up the new App we need.  I'll go over that after you make the change.

Make sure `astra-tik-tok/src/index.js`{{open}} is open, then use the "copy" button to update the file.

<pre class="file" data-filename="astra-tik-toc/src/index.js" data-target="insert"  data-marker="import App from './App';">
import Home from './pages/Home'
import Upload from './pages/Upload'

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
</pre>

The changes here are:
* Delete the "import App from './App' line.  We are going to be putting the App component definition directly in this file so we're not using App.js anymore.
* Import Home and Upload from the component files we just created.
* Define the App component:
    1. Add a <HashRouter> tag.  
    2. Within this tag, add a <Switch> tag (from react-router-dom)
    3. Within the <Switch> tag, define the routes.  Be aware that the first route that matches "wins", so put more specific routes above the general ones as we have done here.

Check in your original terminal to make sure your site is still running as expected by clicking the "Terminal" tab in the bottom of the IDE.  

Go ahead and <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">visit it</a>.  If you go to the <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/upload">upload</a> endpoint, you will get a different blank page.  Anything else will default to '/' (Home).  

Awesome!  We don't have any content yet, so the pages aren't much to look at.  Let's take care of that next!

