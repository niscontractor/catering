'use strict';

function CompanyService($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/company/';

    output.saveOrUpdate = function (company) {
        var deferred = $q.defer();
        $http.put(apiUrl + 'edit/' + company._id, company)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };

    output.getCompanyById = function (companyId) {
        var deferred = $q.defer();
        $http.get(apiUrl + companyId)
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

function readJson($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath2;

    var cuisineUrl = apiUrl + '/cuisine';

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

    //TODO: apiUrl + '/special-need';
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
}
;

angular
        .module('urbanApp')
        .factory('CompanyService', ['$q', '$http', '$rootScope', CompanyService])
        .factory('ReadJson', ['$q', '$http', '$rootScope', readJson]);