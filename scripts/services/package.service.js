'use strict';

function PackageService($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/packages/';

    output.addPackage = function (packageObj) {
        var deferred = $q.defer();
        output.package;
        var obj = {};
        obj.name = packageObj.name;
        obj.title = packageObj.title;
        obj.image = packageObj.image;
        obj.desc = packageObj.desc;
        obj.price = packageObj.price;
        $http.post(apiUrl, obj)
                .success(function (data) {
                    output.package = data;
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
        .factory('PackageService', ['$q', '$http', '$rootScope', PackageService]);
