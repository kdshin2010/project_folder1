var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
	name:String,
	message: String,
	comments: [{type: Schema.Types.ObjectId, ref:"Comment"}]
})
MessageSchema.path('name').required(true, 'Name cannot be blank');
MessageSchema.path('message').required(true, 'Message cannot be blank');
module.exports = mongoose.model('Message', MessageSchema)