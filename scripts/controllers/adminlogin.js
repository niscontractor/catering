'use strict';

function adminCatererCtrl($modalInstance,$modal,$location,SweetAlert,$http,$scope, $rootScope, $state, Common, $localStorage, Auth, catererData, catererId){
    $scope.catererId = catererId;
    $scope.catererData = catererData;
    $scope.closeModal = function(){
        $modalInstance.close();
    }
} 


function signUpCtrl($modalInstance,$modal,$location,SweetAlert,$http,$scope, $rootScope, $state, Common, $localStorage, Auth, isCaterer){
    var ctrl = this;

    $scope.cancelSignUp = function(){
        $modalInstance.close();
    }


    ctrl.register = function () {
        if (ctrl.signUpForm.$valid) {
            var obj = new Object();
            obj.email = ctrl.user.email;
            var jsonString = JSON.stringify(obj);
            var baseUrl = $rootScope.baseUrl + '/api/addBetaUsers';
            $http.post(baseUrl,{'email':obj.email,'isCaterer':isCaterer})
            .success(function(response){
                console.log(response);
                if (response.success==false) {
                    SweetAlert.swal('Failed', response.message);
                }
                else {
                    SweetAlert.swal('Success', response.message, 'success');
                    $modalInstance.close();
                }
            })
            .error(function(error){
                console.log(error);
                // $state.go('user.signin');
            });
        }
        else {
            $rootScope.addMessage('Fill Required Fields');
        }
    };
}

function sessionCtrl($modal,$location,SweetAlert,$http,$scope, $rootScope, $state, Common, $localStorage, Auth) {

   // var baseUrl = $rootScope.baseUrl + '/api/getBetaUserList'; 
   $http.get($rootScope.baseUrl + '/api/getBetaUserList')
            .success(function(response){
                console.log(response);
                $scope.data = response;
            })
            .error(function(error){
                console.log(error);
            });


    var ctrl = this;
    var token = $location.search().userToken;
    var modalInstance;

    $scope.getCaterersList = function(){
        $http.get($rootScope.baseUrl + '/api/getCatererList')
            .success(function(response){
                console.log(response);
                $scope.data = response;
            })
            .error(function(error){
                console.log(error);
            });
    }

    $scope.getCaterer = function(id){
        $http.get($rootScope.baseUrl + '/api/adminCatererDetails/'+id)
            .success(function(response){
                console.log(response);
                var modalInstance = $modal.open({
                    templateUrl: 'views/adminCaterer.html',
                    controller: adminCatererCtrl,
                    resolve: {
                        catererData: function () {
                            return response;
                        },
                        catererId: function(){
                            return id;
                        }
                    },
                    controllerAs : 'signUp',
                    size: 'med',
                    keyboard: false,
                    backdrop: 'static'
                });
                
            })
            .error(function(error){
                console.log(error);
            });
    }



    $scope.createAcount = function(data){
        if (data=='caterer') {
            $scope.isCaterer = true;
            console.log($scope.isCaterer);
        }
        else {
            $scope.isCaterer = false;
        }
            modalInstance = $modal.open({
            templateUrl: 'adminSignUp.html',
            controller: signUpCtrl,
            resolve: {
                isCaterer: function () {
                    return $scope.isCaterer;
                }
            },
            controllerAs : 'signUp',
            size: 'med',
            keyboard: false,
            backdrop: 'static'
        });

    }

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
        .controller('sessionCtrl', ['$modal','$location','SweetAlert','$http','$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth', sessionCtrl])
        .controller('signUpCtrl', ['$modalInstance','$modal','$location','SweetAlert','$http','$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth','isCaterer', signUpCtrl])
        .controller('adminCatererCtrl', ['$modalInstance','$modal','$location','SweetAlert','$http','$scope', '$rootScope', '$state', 'Common', '$localStorage', 'Auth','catererData','catererId', adminCatererCtrl]);