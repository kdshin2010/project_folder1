var app = angular.module('ordersAndCustomers', ['ngRoute']);
console.log('yo')
app.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'views/customers.html',
	}).when('/orders', {
		templateUrl: 'views/orders.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})

app.factory('customerFactory', function() {
	var customers = [
		{name: 'Kyle', created_at: "8/2/2015"},
		{name: 'Matt', created_at: "8/12/2015"},
		{name: 'Eric', created_at: "8/14/2015"},
		{name: 'Jordan', created_at: "8/17/2015"},
		{name: 'Javier', created_at: "8/21/2015"},
		];
	var factory = {}

	factory.getCustomers = function(callback) {
		callback(customers)
	}
	return factory
})

app.factory('orderFactory', function() {
	var quanity = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var products = [{name: 'Nike Shoes'}, 
	{name: 'Babolat Tennis Racket'}, 
	{name: 'Yamaha Fz-09'}, 
	{name: "Hyundai Genesis Coupe"}, 
	{name: "Plane Ticket"}, 
	{name: "Macbook Air"},
	{name: "Macbook Pro"},
	{name: "IPA"},
	{name: "Adidas Backpack"},
	{name: "Planning Guide"},
	{name: "Tips to improve"}];

	// var products = ['nike shoes', 'macook', 'ipa']

	var orders = [
				 {name: 'Eric', product: 'Macbook Pro', quantity: 3, order_date: '8/21/2015'},
				 {name: 'Kyle', product: 'Yamaha Fz-09', quantity: 1, order_date: '1/21/2015'},
				 {name: 'Matt', product: 'Plane Ticket', quantity: 1, order_date: '9/20/2015'}];

	var factory = {}

	factory.getProducts = function(callback) {
		callback(products)
	};

	factory.getOrders = function(callback) {
		callback(orders)
	};
	return factory
})

app.controller('customersController', function($scope, customerFactory) {
	$scope.customers = [];
	customerFactory.getCustomers(function(data) {
		$scope.customers = data
	})


	$scope.addCustomer = function() {;
		var date = new Date();
		var timestamp = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
		$scope.customers.push({name: $scope.newCustomer.name, created_at: timestamp });
		console.log($scope.newCustomer)
		console.log($scope.customers)

		customerFactory.getCustomers(function(data) {
			$scope.customers = data;
		})
		$scope.newCustomer = {};
	}

	$scope.removeCustomer = function(customer) {
		$scope.customers.splice($scope.customers.indexOf(customer), 1);
	}
})

app.controller('ordersController', function($scope, orderFactory, customerFactory) {
	$scope.customers = [];
	$scope.quantity = [1,2,3,4,5]
	$scope.products = [];
	$scope.order_date = new Date();
	$scope.order_timestamp = $scope.order_date.getMonth()+1 + "/" + $scope.order_date.getDate() + "/" + $scope.order_date.getFullYear();
	$scope.orders = [];
	$scope.testarray = [];

	customerFactory.getCustomers(function(data) {
		$scope.customers = data;
	});

	orderFactory.getProducts(function(data) {
		$scope.products = data;
	})

	orderFactory.getOrders(function(data) {
		$scope.oreders = data;
	});

	$scope.addOrder = function() {
		var date = new Date();
		var order_date = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();		
		// $scope.testarray.push({name: $scope.newOrder.name.name, product: $scope.newOrder.product, quantity: $scope.newOrder.quantity, order_date: order_date });
		$scope.orders.push({name: $scope.newOrder.name.name, product: $scope.newOrder.product.name, quantity: $scope.newOrder.quantity, order_date: order_date });

		orderFactory.getOrders(function(data) {
			$scope.orders = data;
		})
		console.log($scope.testarray);
		console.log($scope.orders)
	};

})

//add customer with ng-click send to ng-model

