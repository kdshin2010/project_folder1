(function() {
	'use strict';
	 angular
	  .module('myApp')
	  .controller('LogoutCtrl', LogoutCtrlFunction)

	  LogoutCtrlFunction.$inject = ['$scope', '$location', 'AuthFactory'];

		function LogoutCtrlFunction($scope, $location, AuthFactory){
			$scope.userInformation;
			$scope.logout = logout;

			function logout() {
				AuthFactory.logout()
					.then(function() {
						$location.path('/login')
						console.log(AuthFactory.isLoggedIn())
				})
			}
		}
})();