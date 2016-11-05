var mongoose = require('mongoose');
var Tiger = mongoose.model('Tiger');
module.exports = {
	show: function(request, response) {
		Tiger.find({}, function(err, tigers){
			response.render('main', {tigers:tigers})
		})
	},
	create: function(request, response){
		var tiger = new Tiger({name: request.body.name, info: request.body.info, birthday: request.body.birthday})
		tiger.save(function(err) {
			if(err) {
				console.log('error')
			} else {
				console.log(request.body);
				response.redirect('/main')
			}
		})
	},
	findOne: function(request, response){
		Tiger.find({_id: request.params.id}, function(err, tigering){
			response.render('info', {tigerstud: tigering})
		})
	},
	edit: function(request, response){
		Tiger.find({_id: request.params.id}, function(err, tiger){
			response.render('edit', {tiger: tiger})
		})
	},
	update: function(request, response){
		Tiger.update({name: request.body.name, info: request.body.info, birthday: request.body.birthday}, function(err, tiger){
			response.redirect('/main')
		})
	},
	remove: function(request, response){
		Tiger.remove({_id: request.params.id}, function(err, tiger){
			response.redirect('/main')
		})
	}
}
