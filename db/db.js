const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI, ' this is host stringf')
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${connectionString}`);
})

mongoose.connection.on('error', (err) => {
	console.log(`Mongoose connected err ${err}`);
})

mongoose.connection.on('disonnected', () => {
	console.log('mongoose disconnected');
});