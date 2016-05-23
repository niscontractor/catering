'use strict';

function OrderService($q, $http, $rootScope, $localStorage) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/orders/';

    output.today = function () {
        var deferred = $q.defer();
        $http.get(apiUrl + $localStorage.user.id + '/today')
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
        var deferred = $q.defer();
        $http.get(apiUrl + $localStorage.user.id + '/' + (month + 1))
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
