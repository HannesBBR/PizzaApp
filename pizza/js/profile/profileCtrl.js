'use strict';

app.controller('ProfileCtrl', function ($scope, $location, $cookieStore, $window, UserService) {
                $scope.routeIs = function (routeName) {
                                return $location.path() === routeName;
                };

                //Check if session cookie exists. If not, redirect to login page
                if(angular.isUndefined($cookieStore.get('globals'))){
                                console.log("globals variable was undefined");
                                $window.location.href = '../';
                }
                //Session cookie exists. Extract username
                else{
                                $scope.username = $cookieStore.get('globals').currentUser.username;
                                $scope.firstname = $cookieStore.get('globals').currentUser.user.firstName;
                                $scope.role = $cookieStore.get('globals').currentUser.user.role;
                                $scope.user = $cookieStore.get('globals').currentUser;
                }

                	var vm = this;

	vm.user = null;


	initController();

	function initController() {
		loadCurrentUser();

	}

	function loadCurrentUser() {
		UserService.GetByUsername($scope.username)
			.then(function (user) {
				vm.user = user;
				//$cookies.put('favorite','test');
				$cookieStore.put('myFavorite','oatmeal');
			});
	}

	        $scope.save = function() {
            vm.dataLoading = true;
            vm.user.role="user";
            UserService.Update(vm.user)
                .then(function () {
                 
                      
                        $location.path('/home');
             
                });
        }

});