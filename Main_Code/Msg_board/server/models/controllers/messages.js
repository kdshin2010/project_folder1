vsar Message = require('../models/message.js')
var messageController = {}
messageController.show_all = function(request, response)
{
	Message.find({}, function (message_err, message_result){
		Comment.find({}, function(comment_err, comment_result){
			if(message_err || comment_err)
			{
				response.send("Error")
			} 
			else 
			{
				console.log(message_result);
				response.render('test', {infos: message_result, comments: commentw_result})

			}
		})
	}).sort({_id: -1})
}
messageController.post_message = function(request, response){
	var name_message = new Message({
		name: request.body.name,
		message: request.body.message
	})
	name_message.save(function(err){
		if(err) {
			response.render('test', {title: "You have error in post", errors: name_message.errors})
		} else {
			response.redirect('/');
		}
	})
}
messageController.post_comment = function(req, res) {
	Message.findOne({_id: req.params.id}, function(err, message) {
		var name_comment = new Comment({
			name: req.body.name,
			comment: req.body.comment
		})
		name_comment._message = message._id;
		message.comments.push(name_comment);
		// name_comment.save(function(comment_err){​
		// 	message.save(function(message_err){​
		// 		if(message_err ||comment_err){​
		// 			res.render('/', {title: "There is an error", errors: comment_err});​
		// 		}​
		// 		else​
		// 		{​
		// 			res.redirect('/');​
		// 		}​
		// 	})​
		// })​
		message.save(function(message_err){
			if(message_err){
				res.render('index', {errors: message_err});
			}else{
				name_comment.save(function(comment_err){
					if(comment_err){
						res.render('index', {errors: message_err});
					}else{
						res.redirect('/');
					}
				})
			}
		})
	})
}

module.exports = messageController