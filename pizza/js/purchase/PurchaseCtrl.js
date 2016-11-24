'use strict';

app.controller('PurchaseCtrl', function ($scope, $location, $cookieStore, Order, UserService, OrderService) {
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

	function saveOrder(){
		angular.forEach($scope.order.cart, function(item){
			console.log("item in order: "+JSON.stringify(item));
			console.log("count: "+item.count)
			var orderitem = {};
			orderitem.count = item.count;
			orderitem.pizza = item.pizza.name;
			orderitem.price = item.count * item.pizza.price;
			orderitem.address = $scope.vm.user.address;
			orderitem.status = "new";
			console.log("Saving "+JSON.stringify(orderitem));
			OrderService.Create(orderitem);
		});


	}

	$scope.orderPizza = function(){
		$scope.order.purchase();
		saveUser();
		saveOrder();
	}

	loadCurrentUser();

});