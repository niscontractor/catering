'use strict';

function common($q, $http, $rootScope) {
    var output = {};
    var apiUrl = $rootScope.apipath + '/authenticate';

    output.authenticate = function (json) {
        output.user = {};
        var deferred = $q.defer();
        return $http.post(apiUrl, json)
                .success(function (data) {
                    console.log(data);
                    if (data.success === 'true') {
                        output.user = data;
                        deferred.resolve(data);
                    }else{
                        deferred.reject(data);
                    }
                })
                .error(function (data) {
                    deferred.reject();
                });
        //return deferred.promise;
    };

    return output;
}

angular
        .module('urbanApp')
        .factory('Common', ['$q', '$http', '$rootScope', common]);
