const express = require('express');
const router = express.Router();
const Photos = require('../models/photo');
const Users = require('../models/user');
const Poems = require('../models/poem');


// router.get('/', (req, res) => {
// 	Users.find((err, users)=> {
// 			console.log(Users)
// 	res.render('users/index.ejs', {
// 		users: Users,
// 		id: req.params.id
// 		console.log()
// 	});

// 	});	

// })

router.get('/new', (req, res, next) => {
	
		res.render('users/new.ejs')
		// console.log('new is happening')

})

router.get('/', async (req, res, next) => {
	try {
		console.log('something is happening')
		const foundUsers = await Users.find();
		console.log(foundUsers)
		// res.send(foundUsers)
		res.render('users/index.ejs'/**/, {
			users: foundUsers
		}/**/)

	} catch (err) {
		next(err)
	}
})





router.delete('/:id', async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.id)
		if (user.username === req.session.username) {
			const deletedUser = await Users.findByIdAndRemove(req.params.id);
			const photoId = [];
			for(let i = 0; i < deletedUser.photos.length; i++){
				photoId.push(deletedUser.photos[i]._id)
			} 
			const deletedUserPhotos = await Photos.remove({_id: {$in: photoId}})
			res.redirect('/users')
		} else {
			// res.send("you can't delete")
			req.session.message = "You cannot delete other accounts. Please log in to delete your own account."
			res.redirect('/auth/login')
		}
		

	} catch (err) {
		next(err)
	}
})




router.post('/', async (req, res, next) => {
	
	try {
		const createdUser = await Users.create(req.body);
		res.redirect('/users')
	} catch (err) {
		next(err)
	}
})








router.get('/:id', async (req, res, next) => {
	const message = req.session.message;
	req.session.message = null;

	try {
		const foundUser = await Users.findById(req.params.id)
		console.log(foundUser);
		res.render('users/show.ejs', {
			user: foundUser,
			message: message
		})

	} catch (err) {
		next(err)
	}	
})



router.get('/:id/edit', async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.id)
		if (user.username === req.session.username) {
		const updatedUser = await Users.findById(req.params.id)
		res.render('users/edit.ejs', {
			user: updatedUser

		})
	}else {
			// res.send("you can't edit others stuff")
			req.session.message = "You do not have permission to edit this content."
			res.redirect('/auth/login')
		}
	} catch (err) {
		next(err)
	}	
})


router.put('/:id', async (req, res, next) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect('/users')

	} catch (err) {
		next(err)
	}
})






module.exports = router;