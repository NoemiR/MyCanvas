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

	res.render('photos/new.ejs', {})
})


router.post('/', async (req, res, next) => {

	try {
		// if the user is registered
		if (req.session.logged === true) {
			const foundUser = await Users.findOne({username: req.session.username});

			const newPhoto = await Photos.create(req.body);

			// res.send(foundUser)


			foundUser.photos.push(newPhoto);
			foundUser.save();

			const foundUserId = foundUser._id
			//res.send(foundUser)
			res.redirect('/users/' + foundUserId)
		} else {
			req.session.message = "You must be logged in 	to add a new photo. Please log in or 	create a new account"
			res.send("You must be logged in to add a new 	photo. Please log in or create a new 	account")
		}
	
		
	
		
	} catch(err) {
		next(err)
	} 

})

// ** edit ** content route
router.get('/edit', async (req, res, next) => {
	try {
		// const foundPhoto = await Photos.findById(req.params.id);

		// const allUsers = await Users.find();

		// const foundPhotoUser = await Users.findOne({'photos._id': req.params.id});

		const user = await Users.findOne({username: req.session.username});

		res.render('photos/edit.ejs', {
			user: user
		})
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req, res, next) => {
	try {

		const updatedPhoto = await Photos.findByIdAndUpdate(req.params.id, req.body, {new: true});

		const foundUser = await Users.findOne({username: req.session.username});

		foundUser.photos.id(req.params.id).remove();

		foundUser.photos.push(updatedPhoto);

		const foundUserId = foundUser.id;

		const savedFoundUser = await foundUser.save();
		res.redirect('/users/' + foundUserId)

	}catch(err) {
		next(err);
	}
})

router.delete('/:id', async (req, res, next) => {

	console.log('this route is being called');

	try {
		const foundPhoto = await Photos.findByIdAndRemove(req.params.id);

		console.log(foundPhoto, "<--- the thing you are removing");
		
		const foundUser = await Users.findOne({username: req.session.username});

		console.log(foundUser, "<---- before removing and saving the thing");

		await foundUser.photos.id(req.params.id).remove();
		await foundUser.save();

		console.log(foundUser, "<---- after removing and saving the thing");

		const foundUserId = foundUser._id

		res.redirect('/users/' + foundUserId);
	} catch(err) {
		next(err);
	}
});



 













module.exports = router;