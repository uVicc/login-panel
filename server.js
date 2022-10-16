var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var express = require("express");
const path2 = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// ROUTER
const {
	loginRoute,
	signupRoute,
  myAccountRoute
} = require('./router.js');
// EXPRESS
var app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(connectLiveReload());
app.set('views', path2.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/my-account', myAccountRoute);


app.get('/', function(req, res) {
  /* res.render('index', { page: 'components/nav-bar' }); */
    if(req.session.userid) {
		res.render('index',  { page: 'components/nav-bar' });
	} else {
		res.redirect('/login');
	}
});

app.use(express.static('static'));

app.listen(3000);
console.log('APP started, listening to PORT 3000')