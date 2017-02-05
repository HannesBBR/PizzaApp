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

        /*
        <option value="yes">Carnivore</option>
              <option value="no">Herbivore</option>
              <option value="sometimes">Omnivore</option>
              */

        function createInitialUsers(){
            console.log("creating initial users");
            var cook = {};
            cook.firstName = "Tim";
            cook.lastName = "Cook";
            cook.username = "cook";
            cook.password = "test";
            cook.phone = "023457921";
            cook.role = "cook";
            cook.veggie = "Carnivore";
            cook.religion = "Christian";
            cook.email = "cook@pizza.com";
            UserService.Create(cook);
            var demo = {};
            demo.firstName = "Demo";
            demo.lastName = "Test";
            demo.username = "demo";
            demo.password = "test";
            demo.role = "user";
            demo.phone = "098314124";
            demo.veggie = "Herbivore";
            demo.religion = "Muslim";  
            demo.address="Berkenlaan 8, 1830 Diegem";
            demo.email = "demo@pizza.com";
            UserService.Create(demo);
            var admin = {};
            admin.firstName = "Mario";
            admin.lastName = "Admin";
            admin.username = "admin";
            admin.password = "test";
            admin.phone = "012391239";
            admin.veggie = "Carnivore";
            admin.religion = "Muslim";
            admin.email = "admin@pizza.com";
            admin.role = "admin";
            UserService.Create(admin);
			var deliveroo = {};
			deliveroo.firstName = "Pizza";
			deliveroo.lastName = "Boy";
			deliveroo.username = "pizzaboy";
			deliveroo.password = "test";
            deliveroo.phone = "012312321";
			deliveroo.role = "delivery";
            deliveroo.veggie = "Omnivore";
            deliveroo.religion = "Muslim";
            deliveroo.email = "pizzaboy@pizza.com";
			UserService.Create(deliveroo);
        }

        createInitialUsers();
    }

})();
