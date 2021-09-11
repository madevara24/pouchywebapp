# Pouchy Web App
This is a react based web app where you can add, see, finish, edit, and delete task. Have an offline first functionality using `pouchy-store`.

### Installation
To install clone this repository and run `npm install` to install the dependencies
Go to `src\config\index.js` and change the config for the DB, the default is for local pouchDB server.
```js
export default {
    couchDBUrl: 'http://localhost:5984', // Your DB URL
    couchDBAuth: {
        username: 'admin', // Your DB Username
        password: 'admin', // Your DB Password
    },
    couchDBName: 'task' // Your DB Name
};
```

You can start the web-app using `npm start`
