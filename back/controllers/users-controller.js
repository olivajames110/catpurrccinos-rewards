const HttpError = require('../models/http-error');
// const { validationResult } = require('express-validator');
const User = require('../models/userModel');
var moment = require('moment');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const getUsers = async (req, res, next) => {
// 	let users;

// 	try {
// 		users = await User.find({}, '-password');
// 	} catch (err) {
// 		let error = new HttpError('Could not get users', 500);
// 		return next(error);
// 	}

// 	res.status(201).json({ users: users.map((user) => user.toObject({ getters: true })) });
// };

const DUMMY_USER = [
	{
		id          : 'u1',
		phoneNumber : 'SERVER 555-555-5555',
		points      : 150
	}
];
const NEW_USER = [
	{
		id     : 'u1',
		number : 's',
		points : 0
	}
];

const jimmyUser = {
	id     : 'u1',
	number : '+16314563373',
	points : 800
};



const wake = async (req, res, next) => {
	
	console.log('Wake');
	res.json({ data: 'isAwake' });
};

const getUserByPhoneNumber = async (req, res, next) => {
	const userPhoneNumber = req.params.uid;
	console.log('NUMBER', userPhoneNumber);
	// const existingUser = '+16314563373';
	let userData;
	let isNewUser;
	let foundUser;

	try {
		foundUser = await User.find({ number: userPhoneNumber });
	} catch (err) {
		const error = new HttpError("Could'nt find initial user with phone number", 500);
		return next(error);
	}

	console.log('FOUND USER', foundUser);

	if (foundUser[0]) {
		userData = [
			{
				id     : foundUser[0]._id,
				number : foundUser[0].numbner,
				points : foundUser[0].points
			}
		];
		isNewUser = false;
	} else {
		userData = [ ...NEW_USER ];
		userData[0].number = userPhoneNumber;
		isNewUser = true;
	}

	console.log('GET USER', userData);
	res.json({ user: userData, isNewUser });
};
// -----Original------------------------------------------------------------------------
// const userSignUp = async (req, res, next) => {
// 	const { id, number, points } = req.body;

// 	console.log('BODYYYY', req.body);
// 	const createdUser = new User({
// 		id,
// 		number : number,
// 		points
// 	});

// 	try {
// 		await createdUser.save();
// 	} catch (err) {
// 		let error = new HttpError('Creating user failed', 500);
// 		return next(error);
// 	}

// 	res.status(201).json({ user: createdUser });
// };

// ------Experimental-----------------------------------------------------------------------

const userSignUp = async (req, res, next) => {
	const { id, number, points } = req.body;

	console.log('BODYYYY', req.body);
	const createdUser = new User({
		id,
		number : number,
		points
	});

	try {
		await createdUser.save();
	} catch (err) {
		let error = new HttpError('Creating user failed', 500);
		return next(error);
	}

	res.status(201).json({ user: createdUser });
};
// -----------------------------------------------------------------------------
const userSignIn = async (req, res, next) => {
	const phoneNumber = req.params.uid;

	console.log('USERS PHONE NUMBER', phoneNumber);
	let userData;
	// let existingUser;
	try {
		userData = await User.findOne({ number: phoneNumber });
		// userData = { ...existingUser };
	} catch (err) {
		const error = new HttpError('No user found', 500);
		console.log(error);
	}

	if (!userData) {
		console.log('CREATE NEW USER');
		userData = new User({
			id          : phoneNumber,
			number      : phoneNumber,
			points      : 0,
			redemptions : [],
			visits      : []
		});
		console.log('no user found, sending back empty User');
		// try {
		// 	await userData.save();
		// } catch (err) {
		// 	let error = new HttpError('Creating user failed', 500);
		// 	return next(error);
		// }
	}

	console.log('userData', userData);
	res.status(201).json({ userData: userData.toObject({ getters: true }) });
};

// --------------------------------------------------------------------------------------------

const updatePoints = async (req, res, next) => {
	console.log('STARTING', req.body);
	const { id, number, points, isAddingPoints } = req.body;
	// const phoneNumber = req.body.number;
	// const phoneNumber = '+14015970855';
	// let userData;
	let userData;
	
	try {
		userData = await User.findById(id);
	
	} catch (err) {
		const error = new HttpError("Could'nt find place", 500);
		return next(error);
	}

	if (userData) {
		console.log('Yes, userData found', userData);

		// console.log('points', points);
	
		if (isAddingPoints) {
			userData.points += points;
		} else {
			userData.points -= points;
		}
		console.log('UDATE userData FOUND', userData);
		userData.visits = [ ...userData.visits, { date: moment().format('MMMM Do YYYY'), time: moment().format('h:mm:ss a') } ];
		try {
			await userData.save();
		} catch (err) {
			const error = new HttpError("Couldn't update user points", 500);
			return next(error);
		}
	} else {
		console.log('No, userData found: Create new user');
		userData = new User({
			id          : id,
			number      : number,
			points      : 20,
			redemptions : [],
			visits      : []
		});
		console.log('Truying to save new empty User' , userData);
		try {
			console.log('Saving new userData', userData);
			await userData.save();
		} catch (err) {
			let error = new HttpError('Creating user failed', 500);
			return next(error);
		}
	}

	res.status(200).json({ user: userData.toObject({ getters: true }) });
};
// --------------------------------------------------------------------------------------------

const updateRedemption = async (req, res, next) => {
	console.log('STARTING', req.body);
	const { id, number, itemName, itemValue } = req.body;

	let user;
	try {
		user = await User.findById(id);
		console.log('FOUND USER --->', user);
	} catch (err) {
		const error = new HttpError("Could'nt find place", 500);
		return next(error);
	}

	console.log('user', user);

	user.redemptions = [
		...user.redemptions,
		{ itemName: itemName, date: moment().format('MMMM Do YYYY, h:mm:ss a') }
	];
	user.points -= itemValue;
	console.log('UDATE USER FOUND', user);

	try {
		await user.save();
	} catch (err) {
		const error = new HttpError("Couldn't update user redemptions", 500);
		return next(error);
	}

	res.status(200).json({ user: user.toObject({ getters: true }) });
};
exports.wake = wake;
exports.getUserByPhoneNumber = getUserByPhoneNumber;
exports.userSignUp = userSignUp;
exports.userSignIn = userSignIn;
exports.updatePoints = updatePoints;

exports.updateRedemption = updateRedemption;
// exports.userLogin = userLogin;
