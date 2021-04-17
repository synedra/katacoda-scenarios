# ⚒️ Start your App!

**Objectives**
In this step, we will:
1. Build the react application we'll be working with
2. Clean up the template
3. Check the results in a browser

---

# 1. Create the template

`npx create-react-app astra-tik-tok; cd astra-tik-tok`{{execute}}

This will create the needed files in the 'astra-tik-tok' directory and change your working directory there.

Copy your .env file from the parent directory to make your environment variables available to the application.

`cp ../.env .`{{execute}}

Create a git repository and store your code there.

`git init`{{execute}}

Copy the below command, paste it into the terminal and put your email in quotes then hit return.  It should end up looking like:
`git config --global user.email "kirsten.hunter@datastax.com"`

Here's the copy version:
`git config --global user.email `{{copy}}

`git add -A`{{execute}}

`git commit -a -m "Initial commit"`{{execute}}

# 2. Clean up the template

Your template has extra files and content you don't need for your application.

First, remove the extra files:

`git rm -rf yarn.lock src/App.test.js src/reportWebVitals.js src/setupTests.js`{{execute}}

Let's take a look at the main files we'll be working with.

* `astra-tik-tok/src/index.js` - this file is where everything starts.  At it's simplest, it will look at the App component, and generate it into the indicated place in... 

* `astra-tik-tok/src/index.html` - the "root" div specified as document.getElementById('root').

* `astra-tik-tok/src/App.js` - this file defines your component, and is used by index.js to generate content which it passes along to index.html for rendering.

In `astra-tik-tok/src/App.js`{{open}}, remove the following lines

`import logo from './logo.svg';`
<pre class="file" data-filename="root/astra-tik-tok/src/App.js" data-target="insert" data-marker="import logo from './logo.svg';"></pre>

`<img src={logo} className="App-logo" alt="logo" />`
<pre class="file" data-filename="root/astra-tik-tok/src/App.js" data-target="insert" data-marker='<img src={logo} className="App-logo" alt="logo" />'></pre>

In `astra-tik-tok/src/index.js`{{open}}, remove the following content

`import reportWebVitals from './reportWebVitals';`
<pre class="file" data-filename="root/astra-tik-tok/src/index.js" data-target="insert" data-marker="import reportWebVitals from './reportWebVitals';"></pre>


`reportWebVitals();`
<pre class="file" data-filename="root/astra-tik-tok/src/index.js" data-target="insert" data-marker="reportWebVitals();"></pre>

# 3. Start up the server

Start up the application:
`yarn start`{{execute}}

Visit it <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">here</a>

Now, the display you see there is the default react App component, but we want to make our own.  Let's go ahead and slim it down to the basics.

# 3. Remove App Component Contents

Clear out the unneeded stuff in your App.js file.  After you click the 'Copy to Editor' button your server should reload and going to the <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">site</a> now will have an empty page.

<pre class="file" data-filename="root/astra-tik-tok/src/App.js" data-target="replace">
import './App.css'
const App = () => {
  return (
    &lt;div className="App"&gt;
    &lt;/div&gt;
  );
}
export default App
</pre>


<details>
  <summary>Troubleshooting</summary>
If anything seems to have gone wrong, you can update each of the files to their expected content with these buttons.

<pre class="file" data-filename="root/astra-tik-tok/src/App.js" data-target="replace">
import './App.css'
const App = () => {
  return (
    &lt;div className="App"&gt;
    &lt;/div&gt;
  );
}
export default App
</pre>

<pre class="file" data-filename="root/astra-tik-tok/src/indexx.js" data-target="replace">

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  &lt;React.StrictMode&gt;
    &lt;App /&gt;
  &lt;/React.StrictMod&gt;,
  document.getElementById('root')
);
</pre>

Once you've made the change, go ahead and <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">visit the site</a>, which should have an empty page.
</details>

# 4. Commit to git

Commit the changes to your repository, and tag the current commit for easier retrieval later 
`echo "adding terminal"`{{execute T2}}
`cd astra-tik-tok`{{execute T2}}
`git commit -a -m "Step 3 final"`{{execute T2}}
`git tag -a STEP3 -m "Step 3 final"`{{execute T2}}

Great job!  Next up, you'll learn about routes in react, and build a couple of routes for your application.