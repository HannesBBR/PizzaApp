(function () {
    'use strict';

    app.factory('OrderService', OrderService);

    OrderService.$inject = ['$timeout', '$filter', '$q'];
    function OrderService($timeout, $filter, $q) {

        console.log("instantiating orderservice");

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByOrdertime = GetByOrdertime;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getOrders());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getOrders(), { id: id });
            var order = filtered.length ? filtered[0] : null;
            deferred.resolve(order);
            return deferred.promise;
        }

        function GetByOrdertime(ordertime) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getOrders(), { ordertime: ordertime });
            var order = filtered.length ? filtered[0] : null;
            deferred.resolve(order);
            return deferred.promise;
        }

        function Create(order) {
            var deferred = $q.defer();
            console.log("creating an order in the order service")
            // simulate api call with $timeout
            $timeout(function () {
                GetByOrdertime(order.ordertime)
                    .then(function (duplicateOrder) {
                        if (duplicateOrder !== null) {
                            console.log("duplicateOrder");
                            deferred.resolve({ success: false, message: 'Ordertime "' + order.ordertime + '" is already taken' });
                        } else {
                            var orders = getOrders();

                            // assign id
                            var lastOrder = orders[orders.length - 1] || { id: 0 };
                            order.id = lastOrder.id + 1;
                            console.log("assigning id "+order.id);
                            // save to local storage
                            orders.push(order);
                            setOrders(orders);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(order) {
            var deferred = $q.defer();

            var orders = getOrders();
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].id === order.id) {
                    orders[i] = order;
                    break;
                }
            }
            setOrders(orders);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var orders = getOrders();
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                if (order.id === id) {
                    orders.splice(i, 1);
                    break;
                }
            }
            setOrders(orders);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getOrders() {
			
            if(!localStorage.orders){
                localStorage.orders = JSON.stringify([]);
            }
			
            return JSON.parse(localStorage.orders);
        }

        function setOrders(orders) {
            localStorage.orders = JSON.stringify(orders);
        }
    }
})();