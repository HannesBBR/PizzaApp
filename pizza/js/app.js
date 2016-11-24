'use strict';

var app = angular.module('pizza', ['ngRoute', 'ngResource', 'ngCookies']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/pizza/pizza.html',
			controller: 'PizzaCtrl'
		})
		.when('/purchase', {
			templateUrl: 'js/purchase/purchase.html',
			controller: 'PurchaseCtrl'
		})
		.when('/about-me', {
			templateUrl: 'js/nav/about-me.html'
		})
		.when('/users', {
			templateUrl: 'js/userlist/userList.html',
			controller: 'UserListCtrl',
			controllerAs: 'vm'
		})
		.when('/orders', {
			templateUrl: 'js/orderlist/orderList.html',
			controller: 'OrderListCtrl',
			controllerAs: 'vm'
		})
		.otherwise({
			redirectTo: '/'
		});
});