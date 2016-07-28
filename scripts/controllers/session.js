'use strict';

function sessionCtrl(ngTranslation,$location,SweetAlert,$http,$scope, $rootScope, $state, Common, $localStorage, Auth) {

    var name = $localStorage.selectedLanguage;
    ngTranslation.use(name);

    $localStorage.role = null;
    if ($localStorage.user!=null) {
        $state.go('app.apps.calendar');
    }

    var ctrl = this;
    var token = $location.search().userToken;
    $scope.signin = function(){
        var baseUrl = $rootScope.baseUrl + '/api/forgetPassword';
        $http.post(baseUrl,{'emailAddress':$scope.emailAddress,'role':2})
            .success(function(response){
                console.log(response);
                if (response.success=="true") {
                    SweetAlert.swal('Success', response.message, 'success');
                    $state.go('user.signin');
                }
                else{
                    SweetAlert.swal('Failed', response.message);
                    
                }
            })
            .error(function(error){
                console.log(error);
            });
    }

    $scope.reset_password = function(){
        var baseUrl = $rootScope.baseUrl + '/api/resetPassword';
        $http.post(baseUrl,{'userToken':token,'password':$scope.password})
            .success(function(response){
                console.log(response);
                SweetAlert.swal('Success', response.message, 'success');
                $state.go('user.signin');
            })
            .error(function(error){
                console.log(error);
                $state.go('user.signin');
            });
    }

    ctrl.signin = function () {
        $state.go('app.service');
    };

    ctrl.submit = function () {
        if (ctrl.loginForm.$valid) {
            var obj = new Object();
            obj.email = ctrl.email;
            obj.password = ctrl.password;
            obj.role = 2;
            var jsonString = JSON.stringify(obj);
            if ($localStorage.selectedLanguage=='sp') {
                $rootScope.addMessage('por favor espera...', 'success');
            }
            else {
                $rootScope.addMessage('Please wait...', 'success');  
            }
            Common.authenticate(jsonString).then(function (response) {
                $rootScope.company_id = response.user.company_id;
                $rootScope.isFirstTime = response.isFirstTime;
                $localStorage.company_id = $rootScope.company_id;
                $localStorage.firstName = response.user.firstName;
                $localStorage.token = response.token;

                Common.getUserById(response.user._id).then(function (response) {
                    $rootScope.user = response;
                    $localStorage.user = $rootScope.user;
                    Auth.setUser(response);
                    console.log($localStorage.firstName);
//                    $rootScope.addMessage('Login successful.', 'success');
                    if ($rootScope.isFirstTime==true && $localStorage.firstName!=undefined) {
                        console.log($rootScope.isFirstTime);
                        $state.go('app.apps.social');
                    } 
                    else if($rootScope.isFirstTime==true &&$localStorage.firstName==undefined){
                        $state.go('user.editSignUp');
                    }
                    else {
                        $state.go('app.apps.calendar');
                    }
                }).catch(function (response) {
                    if ($localStorage.selectedLanguage=='sp') {
                        $rootScope.addMessage('Usuario invalido.', 'error');
                    }
                    else {
                        $rootScope.addMessage('Invalid User.', 'error');
                    }
                });
            }).catch(function (response) {
                console.log('failure', response);
                if ($localStorage.selectedLanguage=='sp') {
                    $rootScope.addMessage('Credenciales de acceso invalidos. Por favor, inténtelo de nuevo.', 'error');
                }
                else {
                    $rootScope.addMessage('Invalid login credentials. Please try again.', 'error');
                }
            });
        } else {
            if ($localStorage.selectedLanguage=='sp') {
                $rootScope.addMessage('Se requieren de correo electrónico y contraseña .', 'error');
            }
            else {
                $rootScope.addMessage('Email and password are required.', 'error');
            }
        }
    };
}

angular
        .module('urbanApp')
        .controller('sessionCtrl', ['ngTranslation','$location','SweetAlert','$http','$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth', sessionCtrl]);
