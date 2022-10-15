const express = require('express');
const router = express.Router();
const dbConnect = require('../dbConnect');

router.get('/', function(req, res) {
    if(req.session.userid) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});
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
        console.log(session);
        
        res.redirect('/');
    }
    
});

module.exports = router;