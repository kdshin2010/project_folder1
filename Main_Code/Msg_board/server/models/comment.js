var mongoose = require('Mongoose');
var Schema = mongoose.Schema
var CommentSchema = new mongoose.Schema({
	_message: {type: Schema.ObjectId, ref: "Message"},
	name: String,
	comment: String,
	created_at: {type:Date, default: new Date}
});
CommentSchema.path('name').required(true, "Name cannot be blank");
CommentSchema.path('comment').required(true, "Comment cannot be blank");
module.exports = mongoose.model('Comments', CommentSchema);