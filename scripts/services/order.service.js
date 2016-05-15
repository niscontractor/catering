'use strict';

function OrderService($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/orders/';

    output.today = function () {
        output.events = [];
        var deferred = $q.defer();
        return $http.get(apiUrl+'today')
                .success(function (data) {
                    output.events = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        //return deferred.promise;
    };
    
    output.month = function () {
        output.monthEvents = [];
        var month = new Date().getMonth();
        var deferred = $q.defer();
        return $http.get(apiUrl+ month)
                .success(function (data) {
                    output.monthEvents = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        //return deferred.promise;
    };

    return output;
}

angular
        .module('urbanApp')
        .factory('OrderService', ['$q', '$http', '$rootScope', OrderService]);
