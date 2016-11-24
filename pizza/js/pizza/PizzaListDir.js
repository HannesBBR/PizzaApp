'use strict';

app.directive('pizzaList', function () {
	return {
		restrict: "E",
		templateUrl: "js/pizza/PizzaListDir.html",
		scope: {
			"list": "=",
			"order": "="
		}
	}
});

app.directive('userList', function () {
	return {
		restrict: "E",
		templateUrl: "js/userlist/UserListDir.html",
		scope: {
			"list": "=",
			"order": "=",
			"deleteUser": "=",
			"vm": "="
		}
	}
});