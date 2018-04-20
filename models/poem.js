const mongoose = require('mongoose');

const poemSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	body: {
		type: String
	},
	title: {
		type: String
	},
	dateAdded: {
		type: Date
	}, 
	private: Boolean
})

module.exports = mongoose.model('Poems', poemSchema)