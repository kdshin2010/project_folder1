var tigers = require('./../controllers/tigers.js')
var mongoose=require('mongoose');
var Tiger = mongoose.model('Tiger');
module.exports = function(app) {
	app.get('/', function(request, response){
		response.render('index')
	})
	app.post('/tigers', function(request, response){
		tigers.create(request,response);
	})
	app.get('/main', function(request, response){
		tigers.show(request, response)
	})
	app.get('/tiger/:id', function(request, response){
		tigers.findOne(request,response);	
	})
	app.get('/editTiger/:id', function(request, response){
		tigers.edit(request, response);
	})
	app.post('/updateTiger', function(request, response){
		tigers.update(request, response)
	})
	app.post('/removeTiger/:id', function(request, response){
		tigers.remove(request, response)
	})

}