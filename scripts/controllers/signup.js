'use strict';

function signupCtrl(ngTranslation,$state, Common,$rootScope,$localStorage) {
    var name = $localStorage.selectedLanguage;
    ngTranslation.use(name);
    var ctrl = this;
    ctrl.register = function () {
        if (ctrl.signUpForm.$valid) {
            var obj = new Object();
            obj.email = ctrl.user.email;
            obj.password = ctrl.user.password;
            obj.repassword = ctrl.user.confpassword;
            obj.firstName = ctrl.user.firstName;
            obj.lastName = ctrl.user.lastName;
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
                if ($localStorage.selectedLanguage=='sp') {
                    $rootScope.addMessage('Email ya existe.','error');
                }
                else {
                    $rootScope.addMessage('Email already exists.','error');
                }
            });
        }
    };
}
angular
        .module('urbanApp')
        .controller('signupCtrl', ['ngTranslation','$state','Common','$rootScope','$localStorage', signupCtrl]);
