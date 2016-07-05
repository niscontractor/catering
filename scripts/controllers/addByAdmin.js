'use strict';

function addByAdmin($scope,$rootScope,Common,$modal) {
  Common.getCuisines().then(angular.bind(this, function then() {
        $scope.cuisines = Common.typeOfCuisines;
    }));

  Common.getSpecialNeeds().then(angular.bind(this, function then() {
        $scope.specialNeeds = Common.specialNeeds;
    }));

    Common.getTypeOfEvents().then(angular.bind(this, function then() {
        $scope.typeOfEvents = Common.typeOfEvents;
    }));

    Common.getOfferedServices().then(angular.bind(this, function then() {
        $scope.servicesOffered = Common.servicesOffered;
        console.log(Common.servicesOffered);
    }));

    Common.getTypeOfServices().then(angular.bind(this, function then() {
        $scope.typeOfServices = Common.typeOfServices;
    }));

    Common.getTags().then(angular.bind(this, function then() {
        $scope.tags = Common.tags;
    }));

    $scope.isEnglish = true;
    $scope.isSpanish = false;
    
    $scope.changeLanguage = function(name){
      if (name == 'en') {
        $scope.isEnglish = true;
        $scope.isSpanish = false;
      }
      else {
        $scope.isEnglish = false;
        $scope.isSpanish = true;
      }

    }

    $scope.add = function(name){
      var modalInstance = $modal.open({
              templateUrl: 'addItemByAdmin.html',
              controller: ('addItemByAdminCtrl', ['$http','$scope', '$modalInstance', '$rootScope','object', addItemByAdminCtrl]),
              resolve: {
                  object: function () {
                      return name;
                  }
              },
              size: 'med',
              keyboard: false,
              backdrop: 'static'
          });

      modalInstance.result.then(function (name) {
        if (name=='cuisine') {
          Common.getCuisines().then(angular.bind(this, function then() {
            $scope.cuisines = Common.typeOfCuisines;
          }));
        }
        else if (name=='specialNeed') {
          Common.getSpecialNeeds().then(angular.bind(this, function then() {
            $scope.specialNeeds = Common.specialNeeds;
          }));
        }
        else if (name=='occasion') {
           Common.getTypeOfEvents().then(angular.bind(this, function then() {
              $scope.typeOfEvents = Common.typeOfEvents;
            }));
        }
        else if (name=='offeredServices') {
          Common.getOfferedServices().then(angular.bind(this, function then() {
              $scope.servicesOffered = Common.servicesOffered;
          }));
        }
        else if (name=='typeOfServices') {
          Common.getTypeOfServices().then(angular.bind(this, function then() {
            $scope.typeOfServices = Common.typeOfServices;
          }));

        }
        else if (name=='productTags') {
          Common.getTags().then(angular.bind(this, function then() {
              $scope.tags = Common.tags;
          }));
        }
            
        });
    }
}

function addItemByAdminCtrl($http,$scope,$modalInstance,$rootScope,object){
  $scope.object = object;
  var apiUrl = $rootScope.apipath2;
  $scope.cancel = function(){
    $modalInstance.close();
  }
  $scope.save = function(name){
    if (name=='Cuisine') {
      name = 'cuisine';
    }
    else if (name=='Special Need') {
      name = 'specialNeed';
    }
    else if (name=='Occasion') {
      name = 'occasion';
    }
    else if (name=='Offered Services') {
      name = 'offeredServices';
    }
    else if (name=='Type of services') {
      name = 'typeOfServices';
    }
    else if (name=='Product Tags') {
      name = 'productTags';
      apiUrl =$rootScope.apipath;
    }
    var data = {
      'enName':$scope.english,
      'spName':$scope.spanish
    }

    $http.post(apiUrl+'/'+name, data)
    .success(function(data){
      $modalInstance.close(name);
    });
    
  }
}

angular
  .module('urbanApp')
  .controller('addByAdmin', ['$scope','$rootScope','Common','$modal', addByAdmin])
  .controller('addItemByAdminCtrl', ['$http','$scope', '$modalInstance', '$rootScope','object', addItemByAdminCtrl]);


