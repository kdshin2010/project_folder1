(function() {
	'use strict';

	angular
		.module('app')
		.factory('UserService', UserService);

		function UserService($http, $q) {
			var service = {
				getCurrent: getCurrent,
				getAll: getAll,
				getById: getById,
				getByUsername: getByUsername,
				create: create,
				update: update,
				deleteUser: deleteUser
			}
			return service;

			function getCurrent() {
				return $http.get('/api/users/current').then(handleSuccess, handleError)
			}

			function getAll() {
                return $http.get('/api/users').then(handleSuccess, handleError);
			}

			function getById() {
                return $http.get('/api/users' + _id).then(handleSuccess, handleError);
			}

			function getByUsername(username){
                return $http.get('/api/users' + username).then(handleSuccess, handleError);
			}

			function create(user) {
                return $http.post('/api/users', user).then(handleSuccess, handleError);
			}

			function update(user){
                return $http.put('/api/users' + user._id, user).then(handleSuccess, handleError);
			}
			//private functions
			function handleSuccess(res) {
				return res.data;
			}
			function handleError(res) {
				return $q.reject(res.data);
			}
		}

})();