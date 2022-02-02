const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users-controller');

const DUMMY_USERS = [
	{
		id          : 'u1',
		number      : '555-555-5555',
		points      : 100,
		visits      : [ { date: '3/3/21', time: '2:30pm' }, { date: '3/3/21', time: '2:30pm' } ],
		redemptions : [ { item: 'Coffee', date: '3/3/21' } ]
	},
	{
		id          : 'u2',
		number      : '555-555-5555',
		points      : 150,
		visits      : [ { date: '3/3/21', time: '2:30pm' }, { date: '3/3/21', time: '2:30pm' } ],
		redemptions : [ { item: 'Coffee', date: '3/3/21' } ]
	}
];

router.get('/:uid', usersControllers.getUserByPhoneNumber);
router.get('/wake', usersControllers.wake);

//Patch: update points
// router.get('/:uid', usersControllers.getUserByPhoneNumber);

// ------

//If points === 0
router.post('/:uid', usersControllers.userSignUp);
router.post('/signin/:uid', usersControllers.userSignIn);

router.patch('/update', usersControllers.updatePoints);
router.patch('/update-redemption', usersControllers.updateRedemption);


// ------

//Subtract points
// router.patch('/subtract/:uid', usersControllers.updatePlaceById);

module.exports = router;
