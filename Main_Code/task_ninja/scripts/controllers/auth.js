'user strict';

app.controller('AuthController', function($scope, $location, Auth){
	$scope.register = function(user){
		Auth.register(user).then(function(){
			console.log("Register Success");
			$location.path('/');
		}, function(err){
			console.log('error')
		})
	}
	$scope.login = function(user) {
		Auth.login(user)
		  .then(function(){
		  	console.log('Login Success!');
		  	$location.path('/');
		  }, function(err){
		  	console.log('Error');
		  });
	};
	$scope.changePassword = function(user){
		Auth.changePassword(user)
		  .then(function(){
		  	$scope.user.email = '';
		  	$scope.user.oldPass = '';
		  	$scope.user.newPass = '';

		  	console.log('changed Password Successfully!');
		  }, function(err){
		  	console.log('Error');
		  })
	};
})