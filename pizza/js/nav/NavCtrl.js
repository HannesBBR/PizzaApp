'use strict';

app.controller('NavCtrl', function ($scope, $location, $cookieStore, $window) {
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
                }

});
