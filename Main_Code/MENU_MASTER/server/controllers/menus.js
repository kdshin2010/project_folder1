var mongoose = require('mongoose')
var MenuItem = mongoose.model('MenuItem')
var MenuCategory = mongoose.model('MenuCategory');
var menuController = {};

menuController.show = function(request, response){
	MenuCategory.find({}, function(error, data){
		if(error) {
			console.log('error')
		} else {
			console.log('success')
			response.json(data)
		}
	})
}
menuController.create = function(request, response){
	var menucategory = new MenuCategory({name: request.body.name})
	menucategory.save(function(error){
		if(error) {
			console.log('error')
		} else {
			console.log('success')
		}
	})
}
menuController.destroy = function(request, response){
	MenuCategory.remove({_id: request.body.id}, function(error){
		if(error) {
			console.log('error')
		} else {
			console.log('success')
		}
	})

}
menuController.create_menu = function(request, response){
	MenuCategory.findOne({_id: request.params.id}, function(error, results){
		console.log('here')
		var item = new MenuItem({name: request.body.name, price: request.body.price})
		item._category = results._id
		results.items.push(item)
		results.save(function(error){
			if(error){
				console.log('error')
			} else {
				item.save(function(error){
					if(error){
						console.log('error')
					} else {
						console.log('success')
					}
				})
			}
		})
	})
}
menuController.show_items = function(request, response){
	MenuCategory.find()
	.populate('items')
	.exec(function(error, results){
		if(error) {
			console.log('error')
		} else {
			response.json(results)
		}
	})
}
menuController.modify_items = function(request, response){
	MenuItem.find()
	.populate('Category')
	.exec(function(error, results){
		if(error){
			console.log('error')
		} else {
			response.json(results)
		}
	})
}
menuController.remove_item = function(request, response){
	MenuItem.remove({_id: request.body.id}, function(error){
		if(error){
			console.log('error')
		} else {
			console.log('success')
		}
		response.end();
	})
}
menuController.update_item = function(request, response){
	MenuItem.update({_id: request.body.id}, {name: request.body.name, price: request.body.price}, function(error){
		if(error){
			console.log('error at update')
		} else {
			console.log('success')
		}
	})
}


module.exports = menuController