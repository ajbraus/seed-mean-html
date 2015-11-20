/*
 * SERVER.JS
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 1337

var express = require('express')
  , app = express()
  // INITIALIZE BASIC EXPRESS MIDDLEWARE
  , path = require('path')
  , bodyParser = require('body-parser')
  // INITIALIZE SERVER
  , server = require('http').createServer(app)
  , server = server.listen(port)
  , mongoose  = require('mongoose')
  // ROUTING
  , routes = require('./routes');

// CONNECT TO DB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/seed-mean-html');    

// ADD BODYPARSER
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// SEND PUBLIC STATIC ASSETS (ANGULAR APP)
app.use("/", express.static(path.join(__dirname, 'public')));

// GRAB VIEWS
app.set('views', path.join(__dirname, 'views'));

// USE HTML AS TEMPLATING ENGINE
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// SET INDEX ROUTES
app.get('/', routes.index);
app.get('/templates/:name', routes.templates);

// SET POSTS ROUTES
require('./routes/posts')(app);

// REDIRECT ALL OTHER PATHS TO INDEX (HTML5 history)
app.get('*', routes.index);

// EXPORT SERVER
module.exports = server;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + port);
