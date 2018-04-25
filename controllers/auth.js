const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
	res.render('auth/login')	
})
router.get('/home', (req, res) => {
	res.render('auth/home')	
})

router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({username: req.body.username})
		if(user){
			if(bcrypt.compareSync(req.body.password, user.password)){
				req.session.logged = true;
				req.session.username = user.username;
				console.log(req.session, "<--------req session")
				res.redirect('users/index')
			}
		} else {
			req.session.message = "username or password is incorrect"
			res.redirect('/')
		}

	}catch (err) {
		next(err)
	}
})

router.post('/new', async (req, res, next) => {
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const newUser = {
		username: req.body.username,
		password: passwordHash,
		email: req.body.email
	};
	try {
		const user = await User.create(newUser)
		if(user){
			req.session.logged = true;
			req.session.username = user.username;
			res.redirect('users/index.ejs')
		} else {
			req.session.message = 'Sorry try again'
			res.redirect('auth/home')
		}

	} catch (err) {
		next(err)
	}	
})















module.exports = router;