var myApp = angular.module('menu', ['ngRoute']); 
myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/', {
			templateUrl: 'views/MainPage.html'
		}).
		when('/viewmenu', {
			templateUrl: 'views/ViewMenu.html',
			controller: "ViewMenuController"
		}).
		when('/addorders', {
			templateUrl: 'views/AddOrder.html'
		}).
		when('/addmenu', {
			templateUrl: 'views/AddMenu.html'
		}).
		when('/vieworders', {
			templateUrl: 'views/ViewOrders.html'
		}).
		when('/editcategories', {
			templateUrl: 'views/EditCategories.html'
		})
}])
myApp.factory('MenuFactory', function($http){
	var factory = {}
	var menuCategories = [];
	var fullMenu = [];
	var MenuList = [];
	factory.getMenuCategories = function(callback){
		$http.get('/getmenucategories').success(function(output){
			menuCategories = output;
			callback(menuCategories)
		})
	}
	factory.addMenuCategories = function(info, callback){
		$http.post('/addmenucategories', {name: info.name}).success(function(output){
			menuCategories = output
			callback(menuCategories)
		})
	}
	factory.removeCategory = function(category_id, callback){
		$http.post('/removecategory', {id: category_id}).success(function(output){
			fullMenu = output;
		});
	}
	factory.addMenuItems = function(category_id, info, callback){
		$http.post('/addmenuitems/' + category_id, {name: info.name, price: info.price}).success(function(output){
			fullMenu = output;
			callback(fullMenu)
		});
	}
	factory.getMenuItems = function(callback) {
		$http.get('/getmenuitems').success(function(output){
			fullMenu = output;
			callback(fullMenu)
		})
	}
	factory.updateItem = function(item_id, info){
		$http.post('/updateitem', {id: item_id, name: info.name, price: info.price})
	}
	factory.removeItem = function(menu_id) {
		$http.post('/removeitem', {id: menu_id}).success(function(output){
			menuitems = output
		})
	}
	return factory
})
myApp.factory('OrdersFactory', function($http){
	var factory = {};
	var orders = [];
	var orderItem = [];
	var thisOrder =[];
	var tableInfo;

//Get All Orders
	factory.getOrders = function(callback){
		$http.get('/getorders').success(function(output){
			orders = output
			callback(orders)
		})
	}
	factory.showThisOrder = function(tableId, callback){
		$http.post('/showthisorder', {id: tableId}).success(function(output){
			thisOrder = output
			console.log(thisOrder)
			callback(thisOrder)
		})
	}
	factory.removeOrder = function(id, callback){
		$http.post('/removeorder', {id: id}).success(function(output) {
			orders = output
			callback(orders)
		})
	}
	factory.addOrders = function(info){
		console.log(info)
		$http.post('/addorders', {table: info.table, category: info.category, name: info.name, price: info.price}).success();
	}
	factory.addTable = function(table, callback){
		$http.post('/addtablenumber', {table: table}).success(function(output){
			tableInfo = output
			callback(tableInfo._id)
			console.log(tableInfo._id)
		});
	}
	factory.addOrderItem = function(info, Thisid, callback) {
		$http.post('/addorderitems', {id: Thisid, name: info.name, price: info.price, category: info.category}).success(function(data){
			orderItem = data;
			callback(orderItem)
		})

	}
	factory.removeOrderItem = function(itemId, callback){
		$http.post('/removeOrderItem', {id: itemId}).success(function(output){
			thisOrder = output;
			callback(thisOrder)
		})
	}
	return factory
})
myApp.controller('OrdersController', function($scope, MenuFactory, OrdersFactory){
	$scope.menu_items = [];
	$scope.orders = [];
	$scope.table = [];
	$scope.testItems = [];
	$scope.orderItem = [];
	$scope.tableId
	$scope.show_current_order;
	$scope.thisOrder
	$scope.thisOrdere;
	$scope.tablenumber
	$scope.view_order_items
	$scope.error_message
	$scope.testData
	$scope.tableInfo
	var repeatData;

	OrdersFactory.getOrders(function(data){
		$scope.orders = data;
	})

	$scope.removeOrder = function(order){
		console.log(order._id)
		OrdersFactory.removeOrder(order._id, function(data){
			$scope.orders = data;
		})
		OrdersFactory.getOrders(function(data){
			$scope.orders = data;
		})
	}

// Add Table
	$scope.addTable = function(){
		if (typeof $scope.tablenumber !== "undefined") {
			$scope.view_order_items = true;
			$scope.show_table_order = true;
			$scope.error_message = false
		} else {
			$scope.error_message = true;
		}
		OrdersFactory.addTable($scope.tablenumber, function(data){
			$scope.tableId = data;
			console.log($scope.tableId)
		})
	}
	MenuFactory.getMenuItems(function(data){
		$scope.menu_items = data;
	})	
	$scope.addOrderItem = function(item, menu){
		$scope.view_order_items = 'true'
		$scope.newOrder = {name: item.name, price: item.price, category:menu.name, table: $scope.tablenumber} 
		OrdersFactory.addOrderItem($scope.newOrder, $scope.tableId, function(data){
			$scope.thisOrder = data;
			OrdersFactory.showThisOrder($scope.tableId, function(data){
				$scope.thisOrdere = data;
				$scope.testItems = $scope.thisOrdere.items	
				console.log($scope.testItems)		
			})
		})
	}
	$scope.removeOrderItem = function(item){
		console.log(item._id)
		OrdersFactory.removeOrderItem(item._id, function(data){
			$scope.thisOrder = data;
		})
		OrdersFactory.showThisOrder($scope.tableId, function(data){
			$scope.thisOrder = data;
			$scope.testItems = $scope.thisOrder.items	
		})
		OrdersFactory.getOrders(function(data){
			$scope.orders = data;
		})
	}
})
myApp.controller('ViewMenuController', function($scope, $anchorScroll, $location, MenuFactory) {
	$scope.menu_items = [];
	$scope.menuCategories = [];
	var updatedItem_id;

	//Same Methods
	MenuFactory.getMenuItems(function(data){
		$scope.menu_items = data;
	})
	MenuFactory.getMenuCategories(function(data){
		$scope.menuCategories = data;
	})
	$scope.removeItem = function(item){
		MenuFactory.removeItem(item._id)
		MenuFactory.getMenuItems(function(data){
			$scope.menu_items = data;
		})
	}
	$scope.submitOrder = function(order) {
		console.log(order)

	}
	$scope.showUpdate = function(item){
		$scope.show_menu_update = true
		updatedItem_id = item._id
		console.log(updatedItem_id)
	}
	$scope.updateItem = function(){
		MenuFactory.updateItem(updatedItem_id, $scope.updatedItem)
		$scope.updatedItem = {}
		MenuFactory.getMenuItems(function(data){
			$scope.menu_items = data;
		})
		$scope.show_menu_update = false;
	}
})

myApp.controller('MenuController', function($scope, MenuFactory, $location, $route){
	$scope.menuCategories = [];
	$scope.menu_items = [];
	$scope.orders = [];
	$scope.menu_items_name = [];
	MenuFactory.getMenuCategories(function(data){
		$scope.menuCategories = data;
	})
	MenuFactory.getMenuItems(function(data){
		$scope.menu_items = data
	})
	$scope.addMenuCategories = function(){
		MenuFactory.addMenuCategories({name: $scope.newMenuCategory.name}, function(data){
			$scope.menuCategories = data;
			$scope.newMenuCategory = {};
		})
		MenuFactory.getMenuCategories(function(data){
			$scope.menuCategories = data;
		})
	}
	$scope.removeCategory = function(category){
		MenuFactory.removeCategory(category._id, function(data){
			$scope.menuCateogires = data;
			MenuFactory.getMenuCategories(function(data){
				$scope.menuCategories = data;
			})
		})
	}
	$scope.addMenuItems = function(menuCategory) {
		MenuFactory.addMenuItems(menuCategory, {name: $scope.menuItem.name, price: $scope.menuItem.price}, function(data){
			$scope.menu_items = data;
		});
		MenuFactory.getMenuItems(function(data){
			$scope.menu_items = data
		})
		$location.path('/viewmenu');

		{{test.myString | capitalize}}
	}
})

