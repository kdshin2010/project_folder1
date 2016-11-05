(function() {
	'use strict';
	 angular
	  .module('myApp')
	  .controller('RegisterCtrl', RegisterCtrlFunction)

	  RegisterCtrlFunction.$inject = ['$scope', '$location', 'AuthFactory'];

		function RegisterCtrlFunction($scope, $location, AuthFactory){
			$scope.userInformation;
			$scope.registerUser = registerUser


			function registerUser() {
			    // initial values
			    $scope.error = false;
			    $scope.disabled = true;

			    // call register from service
			     AuthFactory.register($scope.newUser.username, $scope.newUser.password)
			        // handle success
			       .then(function(data) {
			          console.log('here and updated');
			          $scope.userInformation = data
			          console.log($scope.userInformation)
			          $location.path('/login');
			          $scope.disabled = false;
			          $scope.newUser = {};
			        })
			        // handle error
			        .catch(function () {
			          $scope.error = true;
			          $scope.errorMessage = "Something went wrong!";
			          $scope.disabled = false;
			          $scope.newUser = {};
			        });
			     };
			   }
})();