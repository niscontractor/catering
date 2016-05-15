'use strict';

function CategoryService($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/categories/';

    output.getCategories = function (username) {
        output.categories = [];
        var deferred = $q.defer();
        return $http.get(apiUrl + username)
                .success(function (data) {
                    output.categories = data;
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
        .factory('CategoryService', ['$q', '$http', '$rootScope', CategoryService]);