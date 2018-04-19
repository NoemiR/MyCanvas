const mongoose = require('mongoose');
const Photos = require('./photo');
const Poems = require('./poem');

const userSchema = mongoose.Schema({ 
	username: {
		type: String,
		required: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	photos: [Photos.Schema],
	poems: [Poems.Schema]
})

module.exports = mongoose.model('Users', userSchema)