(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$window', 'AuthenticationService', 'FlashService', 'UserService'];
    function LoginController($location, $window, AuthenticationService, FlashService, UserService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password, response.user);
                    //$location.path('/pizza');
                    //$window.location.href = '/pizzaregistration/pizza/app/index.html';
                    $window.location.href='pizza/index.html'
                    //$window.reload();
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };

        function createInitialUsers(){
            console.log("creating initial users");
            var cook = {};
            cook.firstName = "Tim";
            cook.lastName = "Cook";
            cook.username = "cook";
            cook.password = "test";
            cook.role = "cook";
            UserService.Create(cook);
            var demo = {};
            demo.firstName = "Demo";
            demo.lastName = "Test";
            demo.username = "demo";
            demo.password = "test";
            demo.role = "user";
            UserService.Create(demo);
            var admin = {};
            admin.firstName = "Administrator";
            admin.lastName = "Admin";
            admin.username = "admin";
            admin.password = "test";
            admin.role = "admin";
            UserService.Create(admin);
			var deliveroo = {};
			deliveroo.firstName = "Pizza";
			deliveroo.lastName = "Boy";
			deliveroo.username = "pizzaboy";
			deliveroo.password = "test";
			deliveroo.role = "delivery";
			UserService.Create(deliveroo);
        }

        createInitialUsers();
    }

})();
