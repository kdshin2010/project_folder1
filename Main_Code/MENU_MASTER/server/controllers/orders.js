var mongoose = require('mongoose')
var Order = mongoose.model('Order');
var OrderItem = mongoose.model('OrderItem')
var orderController = {};

//Show Order ('get('/showorder')
orderController.showOrder = function(request, response){
	Order.find({}, function(error, data){
		if(error){
			console.log('error')
		} else {
			response.json(data)
			response.end();
		}
	})
}

//Create Order save to orders database
orderController.create = function(request, response){
	console.log(request.body + 'request body')
	console.log(request.body.table)
	console.log(request.body.name)
	var order = new Order({table: request.body.table, category: request.body.category, name: request.body.name, price: request.body.price})
	order.save(function(error){
		if(error){
			console.log('error')
		} else {
			console.log('successfully saved order!')
			response.end();
		}
	})
}

//Find a table request body table
orderController.addTable = function(request, response){
	var order = new Order({table: request.body.table})
	order.save(function(error, results){
		if(error){
			console.log('could not save table number')
		} else {
			console.log('saved table#!')
			response.json(results)
			console.log(results)
			response.end();
		}
	})
}

orderController.showThisOrder = function(request, response){
	Order.findOne({_id: request.body.id})
	.populate('items')
	.exec(function(error, results){
		if(error){
			console.log('could not get the results for showThisOrder Controller')
		} else {
			console.log ('got the results' + ' ' + results)
			response.json(results)
			response.end();
		}
	})
}

orderController.addOrderItems = function(request, response){
	Order.findOne({_id: request.body.id}, function(error, results){
		console.log(results + 'here at line 64' + results.table)
		var orderitem = new OrderItem({name: request.body.name, price: request.body.price, category: request.body.category})
		results.items.push(orderitem)
		results.save(function(error){
			if(error){
				console.log('error saving results')
			} else {
				orderitem.save(function(error){
					if(error){
						console.log('error')
					} else {
						console.log('success saving orderItems' + ' ' + results +  ' ' + orderitem)
						response.end();
					}
				})
			}
		})
	})
}
orderController.removeOrderItem = function(request, response){
	OrderItem.remove({_id: request.body.id}, function(error){
		if(error){
			console.log('error removeing item')
		} else {
			console.log('successfully removed order item!')
		}
		response.end();
	})
}
orderController.showOrder = function(request, response){
	Order.find()
	.populate('items')
	.exec(function(error, results){
		if(error){
		} else {
			response.json(results)
			response.end();
		}
	})
}
orderController.removeOrder = function(request, response){
	Order.remove({_id: request.body.id}, function(error){
		if(error){
			console.log('could not remove order')
		} else {
			console.log('successfully removed order')
			response.end()
		}
	})
}
module.exports = orderController