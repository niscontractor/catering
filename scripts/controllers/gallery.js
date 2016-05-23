'use strict';

function galleryCtrl($scope, PackageService) {
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
  .controller('galleryCtrl', ['$scope', 'PackageService', galleryCtrl]);
