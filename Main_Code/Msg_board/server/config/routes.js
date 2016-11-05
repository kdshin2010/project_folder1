var messageController = require('../controller/messages.js')

module.exports = function(app){
	app.get('/', function(request, response){
		response.render('test');
	})
	app.post('/postMessage', function(request, response){
		messageController.post_message(request, response)
	})
	app.post('/postComment/:id', function(req, res) {
		messageController.post_comment(req, res);
	})
}