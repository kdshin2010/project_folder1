var mongoose = require('mongoose');
var TigerSchema = new mongoose.Schema({
	name: String,
	info: String,
	birthday: String
})
var Tiger = mongoose.model('Tiger', TigerSchema)