const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const dbConnect = require('../dbConnect');
const users = [];

router.get('/', function(req, res) {
	res.render('signup');
})
router.post('/', async (req, res) => {
	try {
		const [row] = await dbConnect.execute("SELECT * FROM usuarios WHERE email = ?", [req.body.email]);

		if(!row[0]) {
			const hashedPass = await bcrypt.hash(req.body.password, 10);
			await dbConnect.query("INSERT INTO usuarios(email,password,cargo) VALUES (?,?,?)", [req.body.email, hashedPass, 0]);
	
			res.redirect('/login');
		}
	} catch {
		res.redirect('/signup');
	}
});

module.exports = router;