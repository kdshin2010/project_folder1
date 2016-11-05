(function(){
	'use strict'
	angular
	.module('myApp',['ngRoute'])
	.config(ConfigFunction)
	.run(RunFunction)

	//config function
	function ConfigFunction($routeProvider) {
	   $routeProvider.
	   when('/', {
	     templateUrl: 'views/register.html',
	     access: {restricted: false}
	   }).
	   when('/register', {
	     templateUrl: 'views/register.html',
	     access: {restricted: false}
	  }).
	   when('/login', {
	     templateUrl: 'views/login.html',
	     access: {restricted: false}
	  }).
	   when('/tasks', {
	     templateUrl: 'views/tasks.html',
	     access: {restricted: true}

	  }).
	   otherwise({
      	 redirectTo: '/login'
	   })
	}
    function RunFunction($rootScope, $location, $route, AuthFactory) {
      $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
          AuthFactory.getUserStatus();
          if (next.access.restricted &&
              !AuthFactory.isLoggedIn()) {
            $location.path('/login');
            $route.reload();
          }
      });
    }


})();