const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', function(req, res) {
    res.render('login');
});
router.post('/', async (req, res) => {
    const match = await bcrypt.compare(req.body.password, "$2b$10$H5GmLr9cl252kIHDlKNko.qTqFWAbqrvkxrj2hORpwOcD4rj4QT4m");
    
    console.log(match);
});

module.exports = router;