const express = require('express');
const router = express.Router();
const Photos = require('../models/photo');
const Users = require('../models/user');
const Poems = require('../models/poem');

// this controller should only have 

router.get('/new', (req, res, next) => {

	res.render('poems/new.ejs', {})
})


router.post('/', async (req, res, next) => {

	try {
		// if the user is registered
		if (req.session.logged === true) {
			const foundUser = await Users.findOne({username: req.session.username});

			const newPoem = await Poems.create(req.body);

			// res.send(foundUser)


			foundUser.poems.push(newPoem);
			foundUser.save();

			const foundUserId = foundUser._id
			//res.send(foundUser)
			res.redirect('/users/' + foundUserId)
		} else {
			req.session.message = "You must be logged in 	to add a new photo. Please log in or 	create a new account"
			// res.send("You must be logged in to add a new 	poem. Please log in or create a new 	account")
		}
	
	} catch(err) {
		next(err)
	} 

})

// ** edit ** content route
router.get('/edit', async (req, res, next) => {

	// if there is stuff in that user's photo array, then do this
	// else redirect to the user's content page and display a message that says you must first add content before you can add it 

	try {
		// const foundPhoto = await Photos.findById(req.params.id);

		// const allUsers = await Users.find();

		// const foundPhotoUser = await Users.findOne({'photos._id': req.params.id});

		const user = await Users.findOne({username: req.session.username});
		// res.send(req.session)

		if (user.poems) {
			res.render('photos/edit.ejs', {
				user: user
			})
		} else {
			req.session.message = "You have no content! Please add content to your page before trying to edit."
			res.redirect('/users/' + user._id)
		}

		
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req, res, next) => {
	try {

		const updatedPoem = await Poems.findByIdAndUpdate(req.params.id, req.body, {new: true});

		const foundUser = await Users.findOne({username: req.session.username});

		foundUser.poems.id(req.params.id).remove();

		foundUser.poems.push(updatedPoem);

		const foundUserId = foundUser.id;

		const savedFoundUser = await foundUser.save();
		res.redirect('/users/' + foundUserId)

	} catch(err) {
		next(err);
	}
})

router.delete('/:id', async (req, res, next) => {

	console.log('this route is being called');

	try {
		const foundPoem = await Poems.findByIdAndRemove(req.params.id);

		console.log(foundPoem, "<--- the thing you are removing");
		
		const foundUser = await Users.findOne({username: req.session.username});

		console.log(foundUser, "<---- before removing and saving the thing");

		await foundUser.poems.id(req.params.id).remove();
		await foundUser.save();

		console.log(foundUser, "<---- after removing and saving the thing");

		const foundUserId = foundUser._id

		res.redirect('/users/' + foundUserId);

	} catch(err) {
		next(err);
	}
});






module.exports = router;