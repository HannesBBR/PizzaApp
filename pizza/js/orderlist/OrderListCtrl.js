'use strict';

app.controller('OrderListCtrl', OrderListCtrl);

OrderListCtrl.$inject = ['OrderService', '$rootScope', '$cookieStore'];
function OrderListCtrl(OrderService, $rootScope, $cookieStore) {
	
	var vm = this;

	vm.user = $cookieStore.get('globals').currentUser.user;
	
	vm.allOrders = [];
	vm.deleteOrder = deleteOrder;
	vm.deliverOrder = deliverOrder;
	vm.bakeOrder = bakeOrder;

	initController();

	function initController() {
		//loadCurrentUser();
		loadAllOrders();
	}

	function loadAllOrders() {
		OrderService.GetAll()
			.then(function (orders) {
				vm.allOrders = orders;
				console.log("all orders:" + JSON.stringify(vm.allOrders));
			});
	}

	function deleteOrder(id) {
		console.log("deleting order with id: "+id);
		OrderService.Delete(id)
		.then(function () {
			loadAllOrders();
		});
	}
	
	function deliverOrder(id){
		console.log("delivering order with id: " + id);
		OrderService.GetById(id).
		then(function(order){
			order.status = "delivered"
			OrderService.Update(order).
			then(function(){
				loadAllOrders();
			});
		});
	}

	function bakeOrder(id){
		console.log("baking order with id: " + id);
		OrderService.GetById(id).
		then(function(order){
			order.status = "baked"
			OrderService.Update(order).
			then(function(){
				loadAllOrders();
			});
		});
	}
	
	
}