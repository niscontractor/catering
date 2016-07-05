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

    $scope.editData = function(name,index){
        var editName;
        if (name=='Cuisine') {
          $scope.editableData = $scope.cuisines[index];
          editName = 'cuisine';
        }
        else if (name=='Special Need') {
          $scope.editableData = $scope.specialNeeds[index];
          editName = 'specialNeed'; 
        }
        else if (name=='Occasion') {
          $scope.editableData = $scope.typeOfEvents[index];
          editName = 'occasion';
        }
        else if (name=='Offered Services') {
          $scope.editableData = $scope.servicesOffered[index];
          editName = 'offeredServices';
        }
        else if (name=='Type of services') {
          $scope.editableData = $scope.typeOfServices[index];
          editName = 'typeOfServices';
        }
        else if (name=='Product Tags') {
          $scope.editableData = $scope.tags[index];
          editName = 'productTags';
        }
      var modalInstance = $modal.open({
              templateUrl: 'addItemByAdmin.html',
              controller: ('addItemByAdminCtrl', ['$http','$scope', '$modalInstance', '$rootScope','object','data', addItemByAdminCtrl]),
              resolve: {
                  object: function () {
                      return editName;
                  },
                  data : function(){
                      return $scope.editableData;
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
            console.log($scope.cuisines);
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

    $scope.add = function(name){


      var modalInstance = $modal.open({
              templateUrl: 'addItemByAdmin.html',
              controller: ('addItemByAdminCtrl', ['$http','$scope', '$modalInstance', '$rootScope','object','data', addItemByAdminCtrl]),
              resolve: {
                  object: function () {
                      return name;
                  },
                  data:function() {
                    return null;
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

function addItemByAdminCtrl($http,$scope,$modalInstance,$rootScope,object,data){
  $scope.object = object;
  $scope.data = data;
  $scope.deleteButton = false;
  if (data!=null) {
    $scope.english = data.name.en;
    $scope.spanish = data.name.sp;
    $scope.deleteButton = true;
  }
  else {
    $scope.deleteButton = false;
  }
  
  var apiUrl = $rootScope.apipath2;
  
  $scope.cancel = function(){
    $modalInstance.close();
  }

  $scope.delete = function(){
    console.log(object);
   var id = {"id": data._id};
   $http({
      method: 'DELETE',
      url: apiUrl +'/'+ object,
      data : id,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function(data){
      $modalInstance.close(object);
    }).error(function(data){
      console.log(data);
    });
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
    var newData = {
      'enName':$scope.english,
      'spName':$scope.spanish
    }
    var editData = {
      'enName':$scope.english,
      'spName':$scope.spanish,
      'id':data._id
    }
    if (data!=null) {
      $http.put(apiUrl+'/'+name, editData)
        .success(function(data){
          $modalInstance.close(name);
        });
    }
    else {
      $http.post(apiUrl+'/'+name, newData)
      .success(function(data){
        $modalInstance.close(name);
        });
    }
    
    
  }
}

angular
  .module('urbanApp')
  .controller('addByAdmin', ['$scope','$rootScope','Common','$modal', addByAdmin])
  .controller('addItemByAdminCtrl', ['$http','$scope', '$modalInstance', '$rootScope','object','data', addItemByAdminCtrl]);


