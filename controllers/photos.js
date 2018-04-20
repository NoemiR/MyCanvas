const express = require('express');
const router = express.Router();
const Photos = require('../models/photo');
const Users = require('../models/user');
const Poems = require('../models/poem');

// writing this as a content controller until it no longer makes sense to do so
// will be able to manipulate photos and poetry, hopefully will let us avoid writing two controllers that do the same thing on the same ejs page

// ** new ** content route
router.get('/new', (req, res, next) => {
	res.render('photos/new.ejs')
})

router.post('/', (req, res, next) => {
	// if the user is registered
	// find that user
	// if photo
	//push the photo into that person's photo array

	// if poem
	// push the poem into that person's poem array

	// try {
	// 	const 
	// } catch() {

	//}
})

// ** edit ** content route
// router.get('/:id/edit', async (req, res, next) => {
// 	try {

// 	}catch(err) {
// 		next(err);
// 	}
// })





 













module.exports = router;