(function(){
	'use strict'
	//this file is entry point for angular app where module is declared
	//also contains dependencies, config, start logic when app is loaded
	//config defines routes of application with UI - Router
	//run functions adds JWT for auth header for http requests --> authenticates web api
	//last function bootsraps angular app after JWT token retrieved from server
	angular
		.module('app', ['ui.router'])
		.config(config)
		.run(run)
	function config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'home/index.html',
				controller: 'Home.IndexController',
				controllerAs: 'vm',
				data: { activeTab: 'home'}
			})
			.state('account', {
				url: '/account',
				templateUrl: 'account/index.html',
				controller: 'Account.IndexController',
				controllerAs: 'vm',
				data: { activeTab: 'account'}
			})
	}
	function run($http, $rootScope, $window) {
		//add JWT token as default header
		$http.defaults.headers.common['Autherization'] = 'Bearer'
	}
})