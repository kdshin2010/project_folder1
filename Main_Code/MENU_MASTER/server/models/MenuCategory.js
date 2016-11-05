var mongoose = require('mongoose');
var MenuItem = require('../models/MenuItem.js')
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var MenuCategorySchema = new mongoose.Schema({
	name: String,
	items: [
		{type: ObjectId, 
		ref: 'MenuItem'}
	]
})
module.exports = mongoose.model('MenuCategory', MenuCategorySchema)

