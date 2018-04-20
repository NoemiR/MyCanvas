const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
	username: {
		type: String,
		// required: true
	},
	url: {
		type: String
	}, 
	title: {
		type: String
	}, 
	description: {
		type: String
	},
	dateAdded: {
		type: Date
	},
	private: Boolean
})

module.exports = mongoose.model('Photos', photoSchema)