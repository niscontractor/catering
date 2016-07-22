'use strict';

function OrderService($q, $http, $rootScope, $localStorage) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/orders/';

    output.todayEvent = function () {
        var deferred = $q.defer();
        var role = 2;
        $http.get(apiUrl + $localStorage.user.id+'/'+role+ '/todayEvent')
                .success(function (data) {
                    console.log(data);
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    output.today = function () {
        var deferred = $q.defer();
        var role = 2;
        $http.get(apiUrl + $localStorage.user.id+'/'+role+ '/today')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    output.month = function () {
        var month = new Date().getMonth();
        var role = 2;
        var deferred = $q.defer();
        $http.get(apiUrl + $localStorage.user.id+ '/'+role+ '/' + (month + 1))
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    return output;
}

angular
        .module('urbanApp')
        .factory('OrderService', ['$q', '$http', '$rootScope', '$localStorage', OrderService]);
