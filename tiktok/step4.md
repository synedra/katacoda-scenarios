# ⚒️ Let's get Routing!

# Routing Pages
Routing is the ability to move between different parts of an application when a user enters a URL or clicks an element.

**Objectives**
1. Add routing with react-router-dom
2. Create a Home and Upload page for our web application

---

# 1. Install the routing module

Install the react-router-dom package:
`cd astra-tik-tok`{{execute T2}}

`yarn add react-router-dom`{{execute}}

Add the following import statement to your index.js file (click the copy link, it'll do it for you)
<pre class="file" data-filename="astra-tik-tok/src/index.js" data-target="prepend">import { HashRouter, Route , Switch} from 'react-router-dom'</pre>

Now you need to create component pages for your Home and Upload components.

Copy the src/App.js file to src/Home.js
`cp src/App.js src/Home.js`{{execute}}
Change the 'App' references in the file to 'Home'
<pre class="file" data-filename="Home.js" data-target="insert"  data-marker="App">Home</pre>

Copy the src/App.js file to src/Upload.js
`cp src/App.js src/Upload.js`{{execute}}
Change the 'App' references in the file to 'Upload'
<pre class="file" data-filename="Upload.js" data-target="insert"  data-marker="App">Upload</pre>


It's time to make some changes to index.js.  Instead of keeping the App component in its own file we'll bring it into here for easier maintenance.

In the index.js file, change the imports.  This will remove the App.js import command and add imports for Home and Upload.

<pre class="file" data-filename="astra-tik-toc/src/index.js" data-target="insert"  data-marker="import App from './App';">
import Home from './pages/Home'
import Upload from './pages/Upload'
</pre>
