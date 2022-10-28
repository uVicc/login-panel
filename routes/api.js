const express = require('express');
const router = express.Router();
const dbConnect = require('../dbConnect');


router.get('/', function(req, res) {
    res.send({ statusApi: true });
});

router.post('/announce/new', function(req, res) {
    if(req.session.cargo != 1) { res.send( { status: "Failed" } ) };

    const sqlInfo = {
        text: req.body.announceText,
        author: req.session.userid
    }
    dbConnect.query("INSERT INTO announces(text, author) VALUES (?, ?)", [sqlInfo.text, sqlInfo.author]);
    res.redirect("/");
});

router.get('/announce/get', async function(req, res) {
    var announces = [];

    const [row] = await dbConnect.execute("SELECT * FROM announces");

    for(var i = 0; i < row.length; i++) {
        announces.push(row[i].text);
    }
    res.send({announces: announces});
})

module.exports = router