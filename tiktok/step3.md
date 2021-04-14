# ⚒️ Start your App!

**Objectives**
In this step, we will:
1. Build the react application we'll be working with
2. Clean up the template
3. Check the results in a browse3r

---

# 1. Create the template

`npx create-react-app astra-tik-tok; cd astra-tik-tok`{{execute}}

This will create the needed files in the 'astra-tik-tok' directory and change your working directory there.

Copy your .env file from the parent directory to make your environment variables available to the application.

`cp ../setup/.env .`{{execute}}

# 2. Clean up the template

Your template has extra files and lines you don't need for your application.

First, remove the extra files:

`rm -rf yarn.lock src/App.test.js reportWebVitals.js setupTests.js`{{execute}}

In `astra-tik-tok/src/App.js`{{open}}, remove the following lines
`import logo from './logo.svg';
<img src={logo} className="App-logo" alt="logo" />`

In `astra-tik-tok/src/index.js`{{open}}, remove the following lines
`import reportWebVitals from './reportWebVitals';
reportWebVitals();`

Install the modules for the application.  This will take some time, please be patient:
`npm install`{{execute}}

While you're waiting, let's take a look at the main files we'll be working with.  You made minor changes to them above, but here's a little more info about how this all works.

* `astra-tik-tok/src/index.js`{{open}} - this file is where everything starts.  At it's simplest, it will look at the App component, and generate it into the indicated place in... 
* `astra-tik-tok/src/index.html`{{open}} - the "root" div specified as document.getElementById('root').
* `astra-tik-tok/src/App.js`{{open}} - this file defines your component, and is used by index.js to generate content which it passes along to index.html for rendering.

Start up the application:
`npm run start`{{execute}}

Visit it <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">here</a>

Now, the display you see there is the default react App component, but we want to make our own.  Let's go ahead and slim it down to the basics:

<pre class="file" data-filename="root/astra-tik-tok/src/App.js" data-target="replace">
import './App.css'

const App = () => {
  return (
    <div className="App">

    </div>
  );
}

export default App
</pre>
