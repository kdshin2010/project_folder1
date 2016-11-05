var menuController = require('../controllers/menus.js')
var orderController = require('../controllers/orders.js')
module.exports = function(app){
	app.get('/getmenucategories', function(request, response){
		menuController.show(request, response)
	})
	app.post('/addmenucategories', function(request, response){
		menuController.create(request, response)
	})
	app.post('/removecategory', function(request, response){
		menuController.destroy(request, response)
	})
	app.post('/addmenuitems/:id', function(request, response){
		menuController.create_menu(request, response)
	})
	app.get('/getmenuitems', function(request, response){
		menuController.show_items(request, response)
	})
	app.get('/modifymenuitems', function(request, response){
		menuController.modify_items(request, response)
	})
	app.post('/removeitem', function(request, response){
		menuController.remove_item(request, response)
	})
	app.post('/updateitem', function(request, response){
		menuController.update_item(request, response);
	})
//Get ALL Orders
	app.get('/getorders', function(request, response){
		orderController.showOrder(request, response)
	})
	app.post('/addorders', function(request, response){
		orderController.create(request, response)
	})
	app.post('/addtablenumber', function(request, response){
		orderController.addTable(request, response)
	})
	app.post('/addorderitems', function(request, response){
		orderController.addOrderItems(request, response)
	})
	app.post('/removeorder', function(request, response){
		orderController.removeOrder(request, response)
	})
	app.post('/showthisorder', function(request, response){
		orderController.showThisOrder(request, response)
	})
	app.post('/removeOrderItem', function(request, response){
		orderController.removeOrderItem(request, response)
	})
}
