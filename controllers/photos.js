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

// ** edit ** content route
// router.get('/:id/edit', async (req, res, next) => {
// 	try {

// 	}catch(err) {
// 		next(err);
// 	}
// })





 













module.exports = router;