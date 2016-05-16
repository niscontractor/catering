'use strict';

function sessionCtrl($scope, $rootScope, $state, Common, $localStorage) {

    var ctrl = this;

    ctrl.signin = function () {
        $state.go('app.service');
    };

    ctrl.submit = function () {
        if (ctrl.loginForm.$valid) {
            var obj = new Object();
            obj.email = ctrl.email;
            obj.password = ctrl.password;
            var jsonString = JSON.stringify(obj);

            Common.authenticate(jsonString).then(function (response) {
                $rootScope.company_id = response.user.company_id;
                $localStorage.company_id = $rootScope.company_id;
                Common.getUserById(response.user._id).then(function (response) {
                    $rootScope.user = response;
                    $localStorage.user = $rootScope.user;
                }).catch(function (response) {
                    $rootScope.addMessage('Invalid User.', 'error');
                });
                $rootScope.addMessage('Login successful.', 'success');
                $state.go('app.apps.calendar');
            }).catch(function (response) {
                console.log('failure', response);
                $rootScope.addMessage('Invalid login credentials. Please try again.', 'error');
            });
        } else {
            $rootScope.addMessage('Email and password are required.', 'error');
        }


    };
}

angular
        .module('urbanApp')
        .controller('sessionCtrl', ['$scope', '$rootScope', '$state', 'Common', '$localStorage', sessionCtrl]);
