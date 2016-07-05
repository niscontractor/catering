'use strict';

function common($q, $http, $rootScope,$state) {
    var output = {};
    var apiUrl = $rootScope.apipath;

    output.getCuisines = function () {
        output.typeOfCuisines = [];
        var deferred = $q.defer();
        return $http.get($rootScope.baseUrl+'/api2/cuisine')
                .success(function (data) {
                    output.typeOfCuisines = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };

   output.getSpecialNeeds = function () {
        output.specialNeeds = [];
        var deferred = $q.defer();
        return $http.get($rootScope.baseUrl+'/api2/specialNeed')
                .success(function (data) {
                    output.specialNeeds = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };

     output.getTypeOfEvents = function () {
        output.typeOfEvents = [];
        var deferred = $q.defer();
        return $http.get($rootScope.baseUrl+'/api2/occasion')
                .success(function (data) {
                    output.typeOfEvents = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };

    output.getOfferedServices = function () {
        output.servicesOffered = [];
        var deferred = $q.defer();
        return $http.get($rootScope.baseUrl+'/api2/offeredServices')
                .success(function (data) {
                    output.servicesOffered = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };

     output.getTypeOfServices = function () {
        output.typeOfServices = [];
        var deferred = $q.defer();
        return $http.get($rootScope.baseUrl+'/api2/typeOfServices')
                .success(function (data) {
                    output.typeOfServices = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };

    var tagUrl = $rootScope.apipath+'/productTags';
    output.getTags = function () {
        output.tags = [];
        var deferred = $q.defer();
        return $http.get(tagUrl)
                .success(function (data) {
                    output.tags = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };
    
    return output;
}

angular
        .module('urbanApp')
        .factory('Common', ['$q', '$http', '$rootScope','$state', common]);
