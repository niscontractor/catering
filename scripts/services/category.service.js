'use strict';

function CategoryService($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/categories/';

    output.getCategories = function (username) {
        output.categories = [];
        output.category;
        var deferred = $q.defer();
        return $http.get(apiUrl)
                .success(function (data) {
                    output.categories = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        //return deferred.promise;
    };

    output.addCategories = function (category) {
        output.category;
        var deferred = $q.defer();
        return $http.post(apiUrl, category)
                .success(function (data) {
                    output.category = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        //return deferred.promise;
    };

    output.editCategories = function (category) {
        var deferred = $q.defer();
        return $http.put(apiUrl, category)
                .success(function (data) {
                    output.category = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        //return deferred.promise;
    };

    output.addCategoryItem = function (category) {
        var categoryName = category.categoryName;
        var deferred = $q.defer();
        console.log(apiUrl+":"+categoryName);
        return $http.post(apiUrl+""+categoryName, category)
                .success(function (data) {
                    output.category = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        //return deferred.promise;
    };
    
     output.editCategoryItem = function (categoryItem) {
        var categoryName = categoryItem.categoryName;
        var itemName = categoryItem.categorItemName;
        var deferred = $q.defer();
        console.log(apiUrl+""+categoryName+"/"+itemName);
        return $http.put(apiUrl+""+categoryName+"/"+itemName, categoryItem)
                .success(function (data) {
                    output.category = data;
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