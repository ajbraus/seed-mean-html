/*
 * SERVER.JS
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express')
  , app = express()
  // INITIALIZE BASIC EXPRESS MIDDLEWARE
  , path = require('path')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  // ENVIRONMENT CONFIGURATION
  , config = require('./config')
  // DB CONFIGURATION
  , db = require('./db')()
  // ROUTING
  , routes = require('./routes')
  // INITIALIZE SERVER
  , server = require('http').createServer(app)
  , server = server.listen(config.port);

// GRAB PUBLIC FOLDER WITH ANGULAR APP
app.use("/", express.static(path.join(__dirname, 'public')));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'OurSuperSecretCookieSecret'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// GRAB VIEWS
app.set('views', path.join(__dirname, 'views'));
// USE HTML AS TEMPLATING ENGINE
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// SET ROUTES
app.get('/', routes.index);
app.get('/templates/:name', routes.templates);
require('./routes/api')(app);

// REDIRECT ALL OTHER PATHS TO INDEX (HTML5 history)
app.get('*', routes.index);

module.exports = server;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);


