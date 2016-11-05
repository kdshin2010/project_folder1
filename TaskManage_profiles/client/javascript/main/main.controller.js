(function(){
	'use strict'
	angular
	.module('myApp')
	.controller('MainCtrl', MainCtrlFunction)

	function MainCtrlFunction($scope, MainFactory, AuthFactory){
		$scope.data = []
		$scope.date
		$scope.newTask = {name: '', priority: '', deadline: '', created: ''}
		$scope.addTask = addTask;
		$scope.deadline
		$scope.removeTask = removeTask
		$scope.user;
		$scope.tasks = [];
		var date = new Date();


		getTasks();
		getUserName();

		function getUserName () {
			AuthFactory.getUserInfo()
			.then(function(data) {
				$scope.user = data;
				console.log(data)
			})
			.catch(function(error){
				console.log('cannot get user info')
			})
		}
		
		function getTasks() {
			MainFactory.getTasks()
			.then(function(data) {
				console.log(data.deadline)
				console.log('in the controller')
				$scope.tasks = data;
			})
			.catch(function() {
				console.log('error')
			})
		}

		function addTask(user) {
			MainFactory.addTask({id: user[0]._id, name: $scope.newTask.task, priority: $scope.newTask.priority, created: date, deadline: $scope.newTask.deadline})
			.then(function(data) {
				console.log('error')
				$scope.tasks = data;
			})
			.catch(function(error) {
				alert('error retriving tasks')
			})
			$scope.newTask = {}
			getTasks();
		}

		function removeTask(id) {
			console.log(id)
			MainFactory.removeTask(id)
			.then(function() {
				console.log()
				console.log('in the controller for removing tasks')
				$scope.tasks=data
			})
			.catch(function() {
				alert('could not remove task!')
			})
			getTasks();
		}
	}

})()