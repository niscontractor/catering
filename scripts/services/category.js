'use strict';

function CategoryService($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/category/';

//    output.today = function () {
//        output.events = [];
//        var deferred = $q.defer();
//        return $http.get(apiUrl+'today')
//                .success(function (data) {
//                    output.events = data;
//                    deferred.resolve(data);
//                })
//                .error(function (data) {
//                    deferred.reject(data);
//                });
//        //return deferred.promise;
//    };

    return output;
}

angular
        .module('urbanApp')
        .factory('CategoryService', ['$q', '$http', '$rootScope', CategoryService]);