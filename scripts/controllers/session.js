'use strict';

function sessionCtrl($location,SweetAlert,$http,$scope, $rootScope, $state, Common, $localStorage, Auth) {

    if ($localStorage.user!=null) {
        $state.go('app.apps.calendar');
    }

    var ctrl = this;
    var token = $location.search().userToken;
    $scope.signin = function(){
        var baseUrl = $rootScope.baseUrl + '/api/forgetPassword';
        $http.post(baseUrl,{'emailAddress':$scope.emailAddress})
            .success(function(response){
                if (response.success=="true") {
                    SweetAlert.swal('Success', response.message, 'success');
                    $state.go('user.signin');
                }
                else{

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
            var jsonString = JSON.stringify(obj);
            $rootScope.addMessage('Please wait...', 'success');  
            Common.authenticate(jsonString).then(function (response) {
                $rootScope.company_id = response.user.company_id;
                $rootScope.isFirstTime = response.isFirstTime;
                $localStorage.company_id = $rootScope.company_id;

                Common.getUserById(response.user._id).then(function (response) {
                    $rootScope.user = response;
                    $localStorage.user = $rootScope.user;
                    Auth.setUser(response);
//                    $rootScope.addMessage('Login successful.', 'success');
                    if ($rootScope.isFirstTime==true) {
                        console.log($rootScope.isFirstTime);
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
        .controller('sessionCtrl', ['$location','SweetAlert','$http','$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth', sessionCtrl]);
