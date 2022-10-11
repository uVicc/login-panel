var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var express = require("express");
const path2 = require('path');
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// ROUTER
const {
	loginRoute,
	signupRoute
} = require('./router.js');

// EXPRESS
var app = express();

app.use(connectLiveReload());
app.set('views', path2.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/login', loginRoute);
app.use('/signup', signupRoute);


app.get('/', function(req, res) {
    res.render('index');
});

app.use(express.static('static'));

app.listen(3000);
console.log('APP started, listening to PORT 3000')