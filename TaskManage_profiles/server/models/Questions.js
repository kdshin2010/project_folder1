var mongoose = require('mongoose'),
	User = require('../models/User.js'),
    Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var QuestionSchema = new mongoose.Schema({
	question: String,
	Correct: String,
	Fake1: String,
	Fake2: String
})



module.exports = mongoose.model('Task', TaskSchema)
