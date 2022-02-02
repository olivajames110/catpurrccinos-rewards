const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	id          : {
		type     : String,
		required : true
	},
	number      : {
		type     : String,
		required : true
	},
	points      : {
		type     : Number,
		required : true
	},
	redemptions : [
		{
			itemName : String,
			date     : String
		}
	],
	visits      : [
		{
			date : String,
			time : String
		}
	]
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
