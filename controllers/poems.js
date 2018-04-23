const express = require('express');
const router = express.Router();
const Photos = require('../models/photo');
const Users = require('../models/user');
const Poems = require('../models/poem');

// this controller should only have 

router.post('/', async (req, res, next) => {
	req.session.username = "Hannah";

	try {
		// if the user is registered
		if (req.session.username) {
			const foundUser = await Users.findOne({username	: req.session.username});

			const newPoem = await Poems.create(req.body);

			// res.send(foundUser)

			foundUser.poems.push(newPoem);
			foundUser.save();
			//res.send(foundUser)
			res.redirect('/users')
		} else {
			req.session.message = "You must be logged in 	to add a new photo. Please log in or 	create a new account"
			res.send("You must be logged in to add a new 	photo. Please log in or create a new 	account")
		}
	
		
	
		
	} catch(err) {
		next(err)
	} 

})



















module.exports = router;