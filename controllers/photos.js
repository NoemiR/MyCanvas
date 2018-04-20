const express = require('express');
const router = express.Router();
const Photos = require('../models/photo');
const Users = require('../models/user');
const Poems = require('../models/poem');

// writing this as a content controller until it no longer makes sense to do so
// will be able to manipulate photos and poetry, hopefully will let us avoid writing two controllers that do the same thing on the same ejs page

// this will be req.session.username because ideally the user will only be able to access these routes if they are logged in
// we want users to only be able to modify content on their own page.

// ** new ** content route
router.get('/new', (req, res, next) => {
	res.render('photos/new.ejs', {
		// pageTitle: "Add a new photo"
	})
})


router.post('/', async (req, res, next) => {
	req.session.username = "Hannah";

	try {
		// if the user is registered
		if (req.session.username) {
			const foundUser = await Users.findOne({username	: req.session.username});

			const newPhoto = await Photos.create(req.body);

			// res.send(foundUser)

			foundUser.photos.push(newPhoto);
			foundUser.save();
			res.send(foundUser)
			// res.redirect('/photos/')
		} else {
			req.session.message = "You must be logged in 	to add a new photo. Please log in or 	create a new account"
			res.send("You must be logged in to add a new 	photo. Please log in or create a new 	account")
		}
	
		
	
		
	} catch(err) {
		next(err)
	} 

})

// ** edit ** content route
// router.get('/:id/edit', async (req, res, next) => {
// 	try {

// 	}catch(err) {
// 		next(err);
// 	}
// })





 













module.exports = router;