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








module.exports = router;