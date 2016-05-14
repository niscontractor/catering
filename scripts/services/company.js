'use strict';

function CompanyService($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/company/';

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

function readJson($q, $http) {
    var output = {};
    var cuisineUrl = 'data/cuisines.json';

    output.getCuisines = function () {
        output.cuisines = [];
        var deferred = $q.defer();
        return $http.get(cuisineUrl)
                .success(function (data) {
                    output.cuisines = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };

    var specialNeedsUrl = 'data/special-needs.json';

    output.getSpecialNeeds = function () {
        output.specialNeeds = [];
        var deferred = $q.defer();
        return $http.get(specialNeedsUrl)
                .success(function (data) {
                    output.specialNeeds = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };
    
    var typeOfEventsUrl = 'data/event-type.json';

    output.getTypeOfEvents = function () {
        output.typeOfEvents = [];
        var deferred = $q.defer();
        return $http.get(typeOfEventsUrl)
                .success(function (data) {
                    output.typeOfEvents = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };
    
    var serviceOfferedUrl = 'data/offered-services.json';

    output.getOfferedServices = function () {
        output.servicesOffered = [];
        var deferred = $q.defer();
        return $http.get(serviceOfferedUrl)
                .success(function (data) {
                    output.servicesOffered = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };
    
    var typeOfServicesUrl = 'data/type-services.json';

    output.getTypeOfServices = function () {
        output.typeOfServices = [];
        var deferred = $q.defer();
        return $http.get(typeOfServicesUrl)
                .success(function (data) {
                    output.typeOfServices = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
    };

    return output;
};

angular
        .module('urbanApp')
        .factory('CompanyService', ['$q', '$http', '$rootScope', CompanyService])
        .factory('ReadJson', ['$q', '$http', readJson]);