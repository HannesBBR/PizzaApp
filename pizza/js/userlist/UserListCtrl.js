'use strict';

app.controller('UserListCtrl', UserListCtrl);

UserListCtrl.$inject = ['UserService', '$rootScope', '$cookieStore'];
function UserListCtrl(UserService, $rootScope, $cookieStore) {
	
	var vm = this;

	vm.user = null;
	vm.allUsers = [];
	vm.deleteUser = deleteUser;

	initController();

	function initController() {
		//loadCurrentUser();
		loadAllUsers();
	}

	function loadCurrentUser() {
		UserService.GetByUsername($rootScope.globals.currentUser.username)
			.then(function (user) {
				vm.user = user;
				//$cookies.put('favorite','test');
				$cookieStore.put('myFavorite','oatmeal');
			});
	}

	function loadAllUsers() {
		UserService.GetAll()
			.then(function (users) {
				vm.allUsers = users;
				console.log(vm.allUsers);
			});
	}

	function deleteUser(id) {
		UserService.Delete(id)
		.then(function () {
			loadAllUsers();
		});
	}
	
	
}