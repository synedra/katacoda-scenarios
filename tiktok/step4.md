# ⚒️ Let's get Routing!

# Routing Pages
Routing is the ability to move between different parts of an application when a user enters a URL or clicks an element.

**Objectives**
1. Add routing with react-router-dom
2. Create a Home and Upload page for our web application

---

# 1. Install the routing module

Install the react-router-dom package:
`yarn install react-router-dom`{{execute T2}}

Add the following import statement to your index.js file (click the copy link, it'll do it for you)
<pre class="file" data-filename="astra-tik-tok/src.js" data-target="prepend">import { HashRouter, Route , Switch} from 'react-router-dom'</pre>

Now you need to create component pages for your Home and Upload components.

Copy the src/App.js file to src/Home.js
`cp src/App.js src/Home.js`
Change the 'App' references in the file to 'Home'
<pre class="file" data-filename="app.js" data-target="insert"  data-marker="App">Home</pre>

Copy the src/App.js file to src/Upload.js
`cp src/App.js src/Upload.js`
Change the 'App' references in the file to 'Upload'
<pre class="file" data-filename="app.js" data-target="insert"  data-marker="App">Upload</pre>



`npx create-react-app astra-tik-tok; cd astra-tik-tok`{{execute}}

This will create the needed files in the 'astra-tik-tok' directory and change your working directory there.

Copy your .env file from the parent directory to make your environment variables available to the application.
