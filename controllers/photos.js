const express = require('express');
const router = express.Router();
const Photos = require('../models/photo');
const Users = require('../models/user');
const Poems = require('../models/poem');

// writing this as a content controller until it no longer makes sense to do so
// will be able to manipulate photos and poetry, hopefully will let us avoid writing two controllers that do the same thing on the same ejs page

// this will be req.session.username because ideally the user will only be able to access these routes if they are logged in
// we want users to only be able to modify content on their own page.
 router.get('/', async (req, res, next) => {
 	console.log(req.session, ' in phote get route')
 	try {
 		const foundPhotos = await Photos.find();
 		res.render('photos/index.ejs', {
 			photos: foundPhotos
 		})
 	} catch (err) {
 		next(err)
 	}
 })

// ** new ** content route
router.get('/new', async (req, res, next) => {
	try {
		const allUsers = await Users.find();
		res.render('photos/new.ejs', {
			users: allUsers
		})
	} catch(err) {
		next(err)
	}

	
})
router.delete('/:id', async (req, res, next) => {
	try {
		const foundPhotos = await Photos.findByIdAndRemove(req.params.id)
		const foundUser = await User.findOne({'photos._id': req.params.id})
		foundUser.photos.id(req.params.id).remove();
    	const savedFoundUser = await foundUser.save();
    	res.redirect('/photos')
	} catch (err) {
		next(err)
	}
})


router.post('/', async (req, res, next) => {

	try {
		const foundUser = await Users.findById(req.body.userId)
		const createdPhoto = await Photos.create(req.body)
		foundUser.photos.push(createdPhoto);
		console.log(foundUser)
		console.log(req.body.userId)
		console.log(savedFoundUser)
		const savedFoundUser = await foundUser.save();
		res.redirect('/photos')
		//res.redirect('/users/' + foundUserId);
	} catch (err) {
		next(err)
	}

		// if the user is registered
		//if (req.session.logged === true) {
			// const foundUser = await Users.findOne({username: req.session.username});

			// const newPhoto = await Photos.create(req.body);

			// // res.send(foundUser)


	// 		foundUser.photos.push(newPhoto);
	// 		foundUser.save();

	// 		const foundUserId = foundUser._id
	// 		//res.send(foundUser)
	// 		res.redirect('/users/' + foundUserId)
	// 	//} else {
	// 		//req.session.message = "You must be logged in 	to add a new photo. Please log in or 	create a new account"
	// 		//res.send("You must be logged in to add a new 	photo. Please log in or create a new 	account")
	// 	//}
		
	// } catch(err) {
	// 	next(err)
	// } 

})





router.put('/:id', async (req, res, next) => {
	try {
		const updatedPhoto = await Photos.findByIdAndUpdate(req.params.id, req.body, {new: true})
		const foundUser = await User.findOne({'photos._id': req.params.id})
		if(foundUser._id.toString() != req.body.userId){
		  foundUser.Photos.id(req.params.id).remove();
	
      const savedFoundUser = await foundUser.save();
      const newUser = await User.findById(req.body.userId)
      newUser.photos.push(updatedPhoto)
        const savedNewUser =await newUser.save()
                res.redirect('/photos/' + req.params.id)
      } else {
            foundUser.photos.id(req.params.id).remove();
            // push new one
            foundUser.photos.push(updatedPhoto)
            // save the updated author to database
            const saveFoundUser = await foundUser.save()
              // let's go back to that article's show page
            res.redirect('/photos/' + req.params.id)
        
      }
      } catch (err) {
     
      next(err)
	}
})

// ** edit ** content route
router.get('/:id/edit', async (req, res, next) => {
	console.log(req.session, ' this is session')
	try {
		const foundPhoto = await Photos.findById(req.params.id)
		const allUsers = await User.find({})
		const foundPhotoUser = await User.findOne({'photos._id': req.params.id})
			res.render('photos/edit.ejs', {
				photo: foundPhoto,
				users: allUsers,
				photoUser: foundPhotoUser
			})
	} catch (err) {
		next(err)
	}

})

	// if there is stuff in that user's photo array, then do this
	//else redirect to the user's content page and display a message that says you must first add content before you can add it 

// 	try {
// 		// const foundPhoto = await Photos.findById(req.params.id);

// 		// const allUsers = await Users.find();

// 		// const foundPhotoUser = await Users.findOne({'photos._id': req.params.id});

// 		const user = await Users.findOne({username: req.session.username});
// 		res.send(req.session)

// 		// if (user.photos) {
// 		// 	res.render('photos/edit.ejs', {
// 		// 		user: user
// 		// 	})
// 		// } else {
// 		// 	req.session.message = "You have no content! Please add content to your page before trying to edit."
// 		// 	res.redirect('/users/' + user._id)
// 		// }

		
// 	} catch (err) {
// 		next(err)
// 	}
// })

// router.put('/:id', async (req, res, next) => {
// 	try {

// 		const updatedPhoto = await Photos.findByIdAndUpdate(req.params.id, req.body, {new: true});

// 		const foundUser = await Users.findOne({username: req.session.username});

// 		foundUser.photos.id(req.params.id).remove();

// 		foundUser.photos.push(updatedPhoto);

// 		const foundUserId = foundUser.id;

// 		const savedFoundUser = await foundUser.save();
// 		res.redirect('/users/' + foundUserId)

// 	}catch(err) {
// 		next(err);
// 	}
// })

// router.delete('/:id', async (req, res, next) => {

// 	//console.log('this route is being called');

// 	try {
// 		const foundPhotos = await Photos.findByIdAndRemove(req.params.id);

// 		//console.log(foundPhotos, "<--- the thing you are removing");
		
// 		const foundUser = await Users.findOne({username: req.session.username});

// 		//console.log(foundUser, "<---- before removing and saving the thing");

// 		await foundUser.photos.id(req.params.id).remove();
// 		await foundUser.save();

// 		//console.log(foundUser, "<---- after removing and saving the thing");

// 		const foundUserId = foundUser._id

// 		res.redirect('/users/' + foundUserId);
// 	} catch(err) {
// 		next(err);
// 	}
// });


router.get('/:id', async (req, res, next) => {
	try { 
		const foundPhoto = await Photos.findById(req.params.id)
		const saveFoundUser = await User.findOne({'photos._id': req.params.id})
		res.render('photos')
	}catch (err) {
		next(err)
	}
})
 













module.exports = router;