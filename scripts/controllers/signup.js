'use strict';

function signupCtrl($state, Common,$rootScope,$localStorage) {
    var ctrl = this;
    ctrl.register = function () {
        if (ctrl.signUpForm.$valid) {
            var obj = new Object();
            obj.email = ctrl.user.email;
            obj.password = ctrl.user.password;
            obj.repassword = ctrl.user.confpassword;
            obj.name = ctrl.user.firstName;
            obj.mobile = ctrl.user.mobile;
            obj.company = ctrl.user.company;
            obj.isCaterer = true;
            var jsonString = JSON.stringify(obj);

            Common.signup(jsonString).then(function (response) {
               if(response.succes){
                    $rootScope.addMessage(response.msg, 'success');
                    $state.go('user.signin');
               }else{
                   $rootScope.addMessage(response.msg, 'error');
               }
            }).catch(function (response) {
                console.log('failure', response);
                $rootScope.addMessage('Email already exists.');
            });
        }
    };
}
angular
        .module('urbanApp')
        .controller('signupCtrl', ['$state','Common','$rootScope', signupCtrl]);
