'use strict';

function common($q, $http, $rootScope,$state) {
    var output = {};
    var apiUrl = $rootScope.apipath;

    output.authenticate = function (json) {
        var deferred = $q.defer();
        $http.post(apiUrl + '/authenticate', json)
                .success(function (data) {
                    console.log(data);
                    if (data.success === true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(data);
                    }
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    output.getUserById = function (userId) {
        var deferred = $q.defer();
        $http.get(apiUrl + '/user/' + userId)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    output.signup = function (json) {
        var deferred = $q.defer();
        $http.post(apiUrl + '/signup', json)
                .success(function (data) {
                    if (data.succes === true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(data);
                    }
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

     output.editSignUp = function (json) {
        var deferred = $q.defer();
        $http.post(apiUrl + '/updateUsers', json)
                .success(function (data) {
                    if (data.result === "true") {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(data);
                    }
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
        .factory('Common', ['$q', '$http', '$rootScope','$state', common]);
