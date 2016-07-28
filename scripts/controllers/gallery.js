'use strict';

function galleryCtrl(ngTranslation,$localStorage,SweetAlert, $scope, $modal, $state, PackageService,$rootScope) {
    var name = $localStorage.selectedLanguage;
    ngTranslation.use(name);
    $scope.ran = [];
    for (var i = 1; i <= 28; i += 1) {
        $scope.ran.push(i);
    }

    $scope.getUserPackages = function () {
        PackageService.getPackages().then(function (response) {
            $scope.userPackages = response;
        }).catch(function (response) {
            console.log('failure', response);
            if ($localStorage.selectedLanguage=='sp') {
                $rootScope.addMessage('Credenciales de acceso invalidos. Por favor, inténtelo de nuevo.', 'error');
            }
            else {
                $rootScope.addMessage('Invalid login credentials. Please try again.', 'error');
            }
            });
    }

    $scope.getPackageDetail = function (packageD) {

        var modalInstance = $modal.open({
            templateUrl: 'packageDetail.html',
            controller: ('PackageDetailCtrl', ['$scope', '$modalInstance', 'packDetail', PackageDetailCtrl]),
            size: 'med',
            resolve: {
                packDetail: function () {
                    return packageD;
                }
            }
        });

        modalInstance.result.then(function (status) {
        });
    };

    function PackageDetailCtrl($scope, $modalInstance, packDetail) {

        $scope.packDetailDetail = packDetail;

        $scope.ok = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.editPackage = function () {
            $modalInstance.dismiss('cancel');
            $rootScope.packageId = packDetail._id;
            $state.go('app.apps.editpackage');
        };
    }

    $scope.deletePackage = function (index) {
        window.event.stopPropagation();
        var package_id = $scope.userPackages[index]._id;
        if ($localStorage.selectedLanguage=='sp') {
            SweetAlert.swal({
            title: "¿Estás seguro?",
            text: "Su no será capaz de recuperar este paquete!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55", confirmButtonText: "Sí, estoy seguro!",
            cancelButtonText: "No, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false},
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Suprimido!", "Su paquete ha sido borrada.", "success");
                    PackageService.deletePackage(package_id).then(angular.bind(this, function then() {
                        PackageService.getPackages().then(function (response) {
                            $scope.userPackages = response;
                        }).catch(function (response) {
                            console.log('failure', response);
                            $rootScope.addMessage('Credenciales de acceso invalidos. Por favor, inténtelo de nuevo.', 'error');
                        });
                    }));
                }
                else {
                    SweetAlert.swal("Cancelado", "Su paquete es seguro :)", "error");
                }
            });
        }
        else {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this package!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false},
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Deleted!", "Your package has been deleted.", "success");
                    PackageService.deletePackage(package_id).then(angular.bind(this, function then() {
                        PackageService.getPackages().then(function (response) {
                            $scope.userPackages = response;
                        }).catch(function (response) {
                            console.log('failure', response);
                            $rootScope.addMessage('Invalid login credentials. Please try again.', 'error');
                            
                        });
                    }));
                }
                else {
                    SweetAlert.swal("Cancelled", "Your package is safe :)", "error");
                }
            });
        }
    }



    $scope.favourites = [{
            name: 'Animals'
        }, {
            name: 'Architecture'
        }, {
            name: 'Nature'
        }, {
            name: 'People'
        }, {
            name: 'Tech'
        }];

    $scope.filters = [{
            name: 'Black and White'
        }, {
            name: 'Colored'
        }, {
            name: 'Monotone'
        }, {
            name: 'Alpha Channel'
        }];

}

angular
        .module('urbanApp')
        .controller('galleryCtrl', ['ngTranslation','$localStorage','SweetAlert', '$scope', '$modal', '$state', 'PackageService','$rootScope', galleryCtrl]);
