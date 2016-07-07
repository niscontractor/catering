'use strict';

function addCatererAdmin($modal,$http,$scope, $rootScope, $state, $localStorage) {	
	$http.get($rootScope.baseUrl + '/api/getCatererList')
            .success(function(response){
                console.log(response);
                $scope.data = response;
                for(var i=0; i<response.length; i++){
                    if ($scope.data[i].status=='Active') {
                        $scope.data[i].status1 = true;
                    }
                    else {
                        $scope.data[i].status1 = false;
                    }
                }
            })
            .error(function(error){
                console.log(error);
            });

    $scope.changeStatus = function(index){
        console.log($scope.data[index]._id);
        var status;
        if ($scope.data[index].status=="Active") {
            status = "InActive";
        }
        else {
            status = "Active";
        }
        $http.post($rootScope.baseUrl + '/api/changeUserStatus',{'userId':$scope.data[index]._id,'userStatus':status})
            .success(function(response){
                console.log(response);
                $scope.data[index].status = status;
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
            var modalInstance = $modal.open({
            templateUrl: '/catering/views/adminSignUp.html',
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

        modalInstance.result.then(function (data) {
            if (data=='cancel') {

            }
            else {
        	$http.get($rootScope.baseUrl + '/api/getCatererList')
            .success(function(response){
                console.log(response);
                $scope.data = response;
                for(var i=0; i<response.length; i++){
                    if ($scope.data[i].status=='Active') {
                        $scope.data[i].status1 = true;
                    }
                    else {
                        $scope.data[i].status1 = false;
                    }
                }
            })
            .error(function(error){
                console.log(error);
            });
            }
        });

    }
}


function signUpCtrl($modalInstance,$modal,$location,SweetAlert,$http,$scope, $rootScope, $state, $localStorage, Auth, isCaterer){
    var ctrl = this;

    $scope.cancelSignUp = function(){
        $modalInstance.close('cancel');
    }



    ctrl.register = function () {
        if (ctrl.signUpForm.$valid) {
            var obj = new Object();
            obj.email = ctrl.user.email;
            var jsonString = JSON.stringify(obj);
            var baseUrl = $rootScope.baseUrl + '/api/createUsers';
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

angular
        .module('urbanApp')
        .controller('addCatererAdmin', ['$modal','$http','$scope', '$rootScope', '$state', '$localStorage', addCatererAdmin])
        .controller('signUpCtrl', ['$modalInstance','$modal','$location','SweetAlert','$http','$scope', '$rootScope', '$state', '$localStorage', 'Auth','isCaterer', signUpCtrl]);