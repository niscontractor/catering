'use strict';

function sessionCtrl($scope, $rootScope, $state, Common, $localStorage, Auth) {

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
            $rootScope.addMessage('Please wait...', 'info');  
            Common.authenticate(jsonString).then(function (response) {
                $rootScope.company_id = response.user.company_id;
                $rootScope.isFirstTime = response.isFirstTime;
                $localStorage.company_id = $rootScope.company_id;
                Common.getUserById(response.user._id).then(function (response) {
                    $rootScope.user = response;
                    $localStorage.user = $rootScope.user;
                    Auth.setUser(response);
//                    $rootScope.addMessage('Login successful.', 'success');
                    if (response.isFirstTime) {
                        $state.go('app.apps.social');
                    } else {
                        $state.go('app.apps.calendar');
                    }
                }).catch(function (response) {
                    $rootScope.addMessage('Invalid User.', 'error');
                });
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
        .controller('sessionCtrl', ['$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth', sessionCtrl]);
