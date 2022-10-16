const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    /* res.render('index', {page: 'components/my-account'}); */
    if(req.session.userid) {
        res.render('index', {page: 'components/my-account'} );
    } else {
        res.redirect('/login');
    };
});


module.exports = router;