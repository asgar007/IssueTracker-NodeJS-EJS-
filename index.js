const express = require('express');
const port = 8002;
const app = express();
//use express layout
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(expressLayout);
app.use(express.urlencoded());

//use static folder
app.use(express.static('./assets'));

//extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store session cookie in db
app.use(session({
    name: 'issueTracker',
    // TODO change the secret before deployment in production mode
    secret: 'issueTracker',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/issue_tracker',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`error in starting server: ${err}`);
    }
    console.log(`successfull server started on port: ${port}`);
})
