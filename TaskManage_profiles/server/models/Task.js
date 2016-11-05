var mongoose = require('mongoose'),
	User = require('../models/User.js'),
    Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var TaskSchema = new mongoose.Schema({
	name: String,
	priority: String,
	deadline: Date,
	_owner: {type: ObjectId, ref: 'User'},
	created: Date
})


mongoose.model('Task', TaskSchema)
