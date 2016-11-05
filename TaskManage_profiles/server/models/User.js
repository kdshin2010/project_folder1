//user model set up
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Task = require('../models/Task.js'),
	ObjectId = Schema.ObjectId,
	passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	username: String,
	password: String,
	score: Number
})



User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User)
