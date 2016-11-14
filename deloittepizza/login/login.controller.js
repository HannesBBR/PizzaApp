(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$window', 'AuthenticationService', 'FlashService'];
    function LoginController($location, $window, AuthenticationService, FlashService) {
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
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    //$location.path('/pizza');
                    //$window.location.href = '/pizzaregistration/pizza/app/index.html';
                    $window.location.href='pizza/index.html'
                    $window.reload();
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
