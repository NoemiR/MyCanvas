const express = require('express');
const router = express.Router();
const Photos = require('../models/photo');
const Users = require('../models/user');
const Poems = require('../models/poem');

// this controller should only have 

router.post('/', async (req, res, next) => {
	// if the user is registered
	if (req.session.username) {
		const foundUser = await Users.findOne({username: req.session.username});
	} else {
		req.session.message = "You must be logged in to add a new photo. Please log in or create a new account"
	}

	const newPoem = await Poems.create(req.body);

	foundUser.poems.push(newPoem);
	foundUser.save();

	res.redirect('/photos/') // potentially eventually redirect somewhere else

})




















module.exports = router;