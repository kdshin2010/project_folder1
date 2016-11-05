(function(){
	'use strict'
	angular
	.module('myApp')
	.factory('MainFactory', MainServiceFunction)

		function MainServiceFunction($http, $q){
		var factory = {}
		return {
			addTask: addTask,
			getTasks: getTasks,
			removeTask: removeTask
		}

		function getTasks() {
			var deferred = $q.defer()
			$http.get('/getTasks')
			.success(function(data) {
				console.log(data)
				console.log(' in the service')
				deferred.resolve(data)
			})
			.error(function() {
				console.log('error getting tasks!')
			})
			return deferred.promise
		}

		function addTask(info) {
			console.log(info)
			var deferred = $q.defer()
			$http.post('/addTask', {id: info.id, name: info.name, priority: info.priority, deadline: info.deadline, created: info.created})
			.success(function(data) {
				console.log('adding Task in the service')
				deferred.resolve(data)
			})
			.error(function() {
				console.log('error adding task in the service')
			})
			return deferred.promise
		}

		function removeTask(id) {
			var deferred = $q.defer()
			$http.post('/removeTask', {id: id})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(){
				deferred.reject();
			})
			return deferred.promise
		}
	}

})()