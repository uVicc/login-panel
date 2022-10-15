const express = require('express');
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
			await dbConnect.query("INSERT INTO usuarios(email,password,cargo) VALUES (?,SHA2(?,256),?)", [req.body.email, req.body.password, 0]);
			res.redirect('/login');
		}
	} catch {
		res.redirect('/signup');
	}
});

module.exports = router;