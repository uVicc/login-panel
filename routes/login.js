const express = require('express');
const router = express.Router();
const dbConnect = require('../dbConnect');

router.get('/', function(req, res) {
    if(req.session.userid) {
        res.redirect('/');
    } else {
        res.render('login', { title: 'login' });
    }
});

router.get('/getLogged', function(req, res) {
    if (req.session.userid) {
        res.send({logged: true});
    } else {
        res.send({logged: false});
    }
})

router.post('/', async (req, res) => {
    var session;
    var infos = {
        email: req.body.email,
        pass: req.body.password
    };

    const [row] = await dbConnect.execute("SELECT * FROM usuarios WHERE email = ? and password = SHA2(?,256)", [infos.email, infos.pass]);
    if(row[0]) {        
        session = req.session;
        session.userid = req.body.email;        
        res.redirect('/');
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie("userid", {path: "/"}).redirect("/login");
    });
});


module.exports = router;