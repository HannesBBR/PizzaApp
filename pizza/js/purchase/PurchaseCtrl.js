'use strict';

app.controller('PurchaseCtrl', function ($scope, $location, $cookieStore, Order, UserService) {
	if (Order.total === 0) {
		$location.path('/');
	}
	$scope.order = Order;

	$scope.user = {};

	$scope.username = $cookieStore.get('globals').currentUser.username;


	$scope.vm= [];

	function loadCurrentUser() {
		UserService.GetByUsername($scope.username)
			.then(function (user) {
				$scope.vm.user = user;
				console.log("current user is: "+JSON.stringify($scope.vm.user));
			});
	};

	function saveUser(){
		console.log("saving user "+JSON.stringify($scope.vm.user));
		UserService.Update($scope.vm.user);
	}

	$scope.orderPizza = function(){
		$scope.order.purchase();
		saveUser();
	}

	loadCurrentUser();

});