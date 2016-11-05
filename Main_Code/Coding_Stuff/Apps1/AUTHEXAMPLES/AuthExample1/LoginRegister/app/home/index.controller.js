(function() {
	'use strict';
	//home index controller --> default for home section, retrieves current user/ makes available to view
	angular
		.module('app')
		.controller('Home.IndexController', indexController)

		function indexController(UserService) {
			var vm = this;
			vm.user = null;

			initController();

			function initController() {
				UserService.getCurrent().then(function(user) {
					vm.user = user;
				})
			}
		}
})();