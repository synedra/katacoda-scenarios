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

`cp ../.env .`{{execute}}

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

Install the modules for the application:
`npm install`{{execute}}

Start up the application:
`npm run start`

Visit it <a href="https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/">here</a>

Run 'npm install' to get requirements.
