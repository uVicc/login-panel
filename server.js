var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var express = require("express");
var fs = require("fs");
const path2 = require('path');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// load configuration
var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
config.port = process.env.PORT || config.port || 8080;
config.host = process.env.HOST || config.host || 'localhost';

var app = express();

app.use(connectLiveReload());

app.set('views', path2.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/login', function(req, res) {
    res.render('login');
});
app.get('/', function(req, res) {
    res.render('index');
});
app.use(express.static('static'));

app.listen(config.port, config.host);
console.log("Running on port "+config.port+" and host "+config.host);