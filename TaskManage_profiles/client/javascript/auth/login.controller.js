(function() {
	'use strict';
	angular
		.module('myApp')
		.controller('LoginCtrl', LoginCtrl)

		LoginCtrl.$inject = ['$scope', '$location', 'AuthFactory']

		function LoginCtrl($scope, $location, AuthFactory) {
		    $scope.user;
		    $scope.userInformation
		    console.log($scope.userInformation)
		    $scope.login = login

		    function login() {

		      // initial values
		      $scope.error = false;
		      $scope.disabled = true;

		      AuthFactory.login($scope.user.username, $scope.user.password)
		        // handle success
		        .then(function (data) {
		          console.log(data)
		          $scope.userInformation = data;
		          $location.path('/tasks');
		          $scope.disabled = false;
		          console.log(AuthFactory.isLoggedIn());
		          $scope.user = {};
		        })
		        // handle error
		        .catch(function () {
		          $scope.error = true;
		          $scope.errorMessage = "Invalid username and/or password";
		          $scope.disabled = false;
		          $scope.loginForm = {};
		       });
		    }

		}
})();