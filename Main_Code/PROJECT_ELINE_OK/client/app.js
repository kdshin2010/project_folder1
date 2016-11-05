var myApp = angular.module('eLineProject', ['ngRoute']);

myApp.config (function($routeProvider) {
	$routeProvider.when('/', {
	      templateUrl: 'views/user_info.html',
	      controller: 'eLineController'
	    }).when('/info', {
	      templateUrl: 'views/page_4.html',
	      controller: 'eLineController'
		}).when('/page3', {
		  templateUrl: 'views/page_3.html',
		  controller: 'eLineController'
		})
	})

myApp.factory('eLineFactory', function() {
	var people = [
	{name: 'Kyle', id: '12a', time_created: '3:36:35 pm', placeInLine: 1, phoneNumber: '909-260-2528'},
	{name: 'Hesham', id: '23b', time_created: '3:36:39 pm', placeInLine: 2, phoneNumber: '909-521-2312'},
	{name: 'Matthew', id: '45c', time_created: '3:36:45 pm',placeInLine: 3, phoneNumber: '4098-521-2312'},
	{name: 'Eric', id: '56d', time_created: '3:36:49 pm', placeInLine: 4, phoneNumber: '951-721-2312'},
	{name: 'Sarah', id: '78d', time_created: '3:36:52 pm', placeInLine: 5, phoneNumber: '408-521-2312'},
	{name: 'Barrington', id: '90e', time_created: '3:36:55 pm', placeInLine: 6, phoneNumber: '415-223-1235'},
	{name: 'Jose', id: '12f', time_created: '3:37:15', placeInLine: 7, phoneNumber: '650-123-3213'},
	{name: 'Jordan', id: '34g', time_created: '3:37:35 25', placeInLine: 8, phoneNumber: '972-231-2132'},
	{name: 'Mary', id: '56h', time_created: '3:38:12 pm', placeInLine: 9, phoneNumber: '925-312-2123'},
	{name: 'Patricia', id: '78i', time_created: '3:38:35 pm', placeInLine: 10, phoneNumber: '415-571-8312'},
	{name: 'Patrick', id: '90j', time_created: '3:38:39 pm', placeInLine: 11, phoneNumber: '760-232-4124'},
	{name: 'Parker', id: '12k', time_created: '3:38:41 pm', placeInLine: 12,phoneNumber: '725-821-2312' }
	];
	var factory = {};
	factory.getPeople = function(callback) {
		callback(people);
	}
	return factory;
})
myApp.controller('eLineController', function ($scope, eLineFactory) {
	$scope.people = [];
	eLineFactory.getPeople(function(data) {
		$scope.people = data;
	})
	$scope.addPerson = function() {
		var linePlace = $scope.people.length + 1
		var currentDate = new Date();
		var currentTime = currentDate.getHours()- 12 + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(); + "pm"

		$scope.newPerson.placeInLine = linePlace;
		$scope.newPerson.time_created = currentTime + " pm";
		$scope.people.push($scope.newPerson);
		$scope.newPerson = {};
		console.log($scope.people.length);
	}
});


