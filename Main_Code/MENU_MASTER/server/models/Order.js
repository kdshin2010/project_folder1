var mongoose = require('mongoose');
var Schema = mongoose.Schema
var OrderItemSchema = new mongoose.Schema({
	_table: {type: Number, ref: 'Order'},
	name: String,
	price: Number,
	category: String,
	quantity: Number
})
var OrderSchema = new mongoose.Schema({
	table: Number,
	items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem'
	}] 
})
var Order = mongoose.model('Order', OrderSchema);
var OrderItem = mongoose.model('OrderItem', OrderItemSchema)