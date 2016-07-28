'use strict';

function editSignUpCtrl($location,SweetAlert,$http,$scope, $rootScope, $state, Common, $localStorage, Auth) {
    var ctrl = this;
    console.log($localStorage.user);
    $scope.email = $localStorage.user.email;

    ctrl.register = function () {
        if (ctrl.signUpForm.$valid) {
            var obj = new Object();
            obj.password = ctrl.user.password;
            obj.firstName = ctrl.user.firstName;
            obj.lastName = ctrl.user.lastName;
            obj.mobile = ctrl.user.mobile;
            obj.company = ctrl.user.company;
            obj.userId = $localStorage.user.id;
            var jsonString = JSON.stringify(obj);

            Common.editSignUp(jsonString).then(function (response) {
               console.log(response);
               if(response.result=="true"){
                    $rootScope.addMessage(response.message, 'success');
                    $state.go('app.apps.social');
               }else{
                   $rootScope.addMessage(response.message, 'error');

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
        .controller('editSignUpCtrl', ['$location','SweetAlert','$http','$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth', editSignUpCtrl]);
