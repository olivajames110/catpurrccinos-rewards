const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/user-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	next();
});

app.use('/api/user', usersRoutes);

// let mongooseConnect =
// 	'mongodb+srv://jimmy:ordereze6@cluster0.q4myu.mongodb.net/phoneNumbers?retryWrites=true&w=majority';

let mongooseConnect = `mongodb+srv://${process.env.DB_USER}:${process.env
	.DB_PASSWORD}@cluster0.q4myu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
	.connect(mongooseConnect)
	.then(() => {
		console.log('Connected');
		app.listen(process.env.PORT || 5000);
	})
	.catch((err) => {
		console.log('Connection Failed ');
		console.log(err);
	});
