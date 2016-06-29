'use strict';

function ReportService($q, $http, $rootScope, $localStorage) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/orders/';

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

    output.week = function () {
        var deferred = $q.defer();
        var role = 2;
        $http.get(apiUrl + $localStorage.user.id+'/'+role+ '/week')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    output.month = function (month) {
        var role = 2;
        var deferred = $q.defer();
        $http.get(apiUrl + $localStorage.user.id+ '/'+role+ '/' + month)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };
    output.fromToDateOrder = function (startDate,endDate) {
        var role = 2;
        var deferred = $q.defer();
        $http.get(apiUrl + $localStorage.user.id+ '/'+role+ '/' + startDate+ '/' + endDate)
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
        .factory('ReportService', ['$q', '$http', '$rootScope', '$localStorage', ReportService]);