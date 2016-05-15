'use strict';

function sessionCtrl($scope, $rootScope, $state, Common, localStorageUtilityService) {
    $scope.signin = function () {
        $state.go('app.service');
    };

    $scope.submit = function () {

        if ($scope.loginForm.$valid) {
            var obj = new Object();
            obj.email = $scope.email;
            obj.password = $scope.password;
            var jsonString = JSON.stringify(obj);

//            $state.go('app.apps.calendar');
//            localStorageUtilityService.addToLocalStorage('login-user', jsonString);

            Common.authenticate(jsonString).then(angular.bind(this, function then() {
                if (Common.user !== null || Common.user !== undefined) {
                    $rootScope.user = Common.user;
                    localStorageUtilityService.addToLocalStorage('login-user', $rootScope.user);
                    $state.go('app.apps.calendar');
                }else{
                   //error
                }
            }));
        } else {
            console.log('hello');
        }


    };
}

angular
        .module('urbanApp')
        .controller('sessionCtrl', ['$scope', '$rootScope', '$state', 'Common', 'localStorageUtilityService', sessionCtrl]);
