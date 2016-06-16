'use strict';

function PackageService($q, $http, $rootScope, $localStorage) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/packages/';

    output.addPackage = function (packageObj) {
        var deferred = $q.defer();
        output.package;
        packageObj = JSON.parse(packageObj);
        var obj = {};
        obj.name = packageObj.name;
        obj.title = packageObj.title;
        obj.image = packageObj.image;
        obj.desc = packageObj.desc;
        obj.price = packageObj.price;
        obj.qty = packageObj.qty;
        $http.post(apiUrl + 'user/' + $localStorage.user.id, obj)
                .success(function (data) {
                    output.package = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    output.getPackages = function (packageObj) {
        var deferred = $q.defer();
        $http.get(apiUrl + 'user/' + $localStorage.user.id)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
    };

    output.deletePackage = function (package_id) {
        var deferred = $q.defer();
        $http.delete(apiUrl  + package_id)
                .success(function (data) {
                    deferred.resolve(data);
                    console.log("success");
                })
                .error(function (data) {
                    deferred.reject(data);
                    console.log("error");
                });
                return deferred.promise;
    };

    output.getPackageById = function (packageId) {
        var deferred = $q.defer();
        $http.get(apiUrl + packageId)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
    };

    output.addSectionToPackage = function (packageId, sections) {
        var deferred = $q.defer();
        $http.post(apiUrl + packageId + '/sections', {sections: sections})
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
        .factory('PackageService', ['$q', '$http', '$rootScope', '$localStorage', PackageService]);
