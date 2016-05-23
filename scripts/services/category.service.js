'use strict';

function CategoryService($q, $http, $rootScope, $localStorage) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/categories/';

    output.getCategories = function (username) {
        output.categories = [];
        output.category;
        var deferred = $q.defer();
        return $http.get(apiUrl + $localStorage.user.id)
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
        return $http.post(apiUrl + $localStorage.user.id, category)
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
        return $http.put(apiUrl + $localStorage.user.id, category)
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
        return $http.post(apiUrl + categoryName + '/item', category)
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
    
     output.deleteCategoryItem = function (category , item) {
        var categoryName = category;
        var itemName = item;
        var deferred = $q.defer();
        console.log(apiUrl+""+categoryName+"/"+itemName);
        return $http.delete(apiUrl+""+categoryName+"/"+itemName)
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
        .factory('CategoryService', ['$q', '$http', '$rootScope', '$localStorage', CategoryService]);