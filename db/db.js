const mongoose = require('mongoose');

console.log(process.env.DB_HOST, ' this is host stringf')
const connectionString = process.env.DB_HOST;

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