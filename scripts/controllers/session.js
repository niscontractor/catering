'use strict';

function sessionCtrl($scope, $state) {
  $scope.signin = function () {
    $state.go('app.service');
  };

  $scope.submit = function () {
    $state.go('app.service');
  };
}

angular
  .module('urbanApp')
  .controller('sessionCtrl', ['$scope', '$state', sessionCtrl]);
