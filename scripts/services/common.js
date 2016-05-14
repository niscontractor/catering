'use strict';

function common($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/common/authenticate';

    output.authenticate = function (json) {
        output.user = {};
        var deferred = $q.defer();
        return $http.post(apiUrl,json)
                .success(function (data) {
                    output.user = data;
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
        .factory('Common', ['$q', '$http', '$rootScope', common]);
