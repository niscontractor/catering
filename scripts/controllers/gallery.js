'use strict';

function galleryCtrl($scope, $modal, PackageService) {
  $scope.ran = [];

  for (var i = 1; i <= 28; i += 1) {
    $scope.ran.push(i);
  }

  $scope.getUserPackages = function() {
    PackageService.getPackages().then(function(response) {
      $scope.userPackages = response;
    }).catch(function (response) {
        console.log('failure', response);
        $rootScope.addMessage('Invalid login credentials. Please try again.', 'error');
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

        modalInstance.result.then(function (status) {});
    };

    function PackageDetailCtrl($scope, $modalInstance, packDetail) {

        $scope.packDetailDetail = packDetail;

        $scope.ok = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
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
  .controller('galleryCtrl', ['$scope', '$modal', 'PackageService', galleryCtrl]);
