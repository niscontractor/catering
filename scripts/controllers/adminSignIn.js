'use strict';


function sessionCtrl($modal,$location,SweetAlert,$http,$scope, $rootScope, $state, Common, $localStorage, Auth) {

   // var baseUrl = $rootScope.baseUrl + '/api/getBetaUserList'; 
   $localStorage.role = 0;

    var ctrl = this;
    var token = $location.search().userToken;
    var modalInstance;

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
            obj.role = 0;
            var jsonString = JSON.stringify(obj);
            $rootScope.addMessage('Please wait...', 'success');  
            Common.authenticate(jsonString).then(function (response) {
                console.log(response);
                $rootScope.company_id = response.user.company_id;
                $rootScope.isFirstTime = response.isFirstTime;
                $localStorage.company_id = $rootScope.company_id;
                $localStorage.token = response.token;

                Common.getUserById(response.user._id).then(function (response) {
                    $rootScope.user = response;
                    $localStorage.user = $rootScope.user;
                    $localStorage.role = 0;
                    Auth.setUser(response);
//                    $rootScope.addMessage('Login successful.', 'success');
                     $state.go('app.apps.admin');
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
        .controller('sessionCtrl', ['$modal','$location','SweetAlert','$http','$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth', sessionCtrl]);