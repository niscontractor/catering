'use strict';

function packageCtrl($scope, $state, $rootScope, $modal,$modal$interval, COLORS, CategoryService, PackageService) {
    var ctrl = this;

    $scope.getCategoryList = function () {

//TODO $rootScope.user.username
        CategoryService.getCategories('').then(angular.bind(this, function then() {
            console.log(CategoryService.categories);
            ctrl.categories = [];
            angular.forEach(CategoryService.categories, function (category) {
                var cat = {};
                cat.text = category.name;
                cat.id = category._id;
                cat.selectable = false;
                cat.nodes = [];
                var index = 0;
                angular.forEach(category.items, function (item) {
                    var node = {};
                    node.id = item._id;
                    node.selectable = false;
                    node.text = item.name;
                    node.tags = [index];
                    index = index + 1;
                    cat.nodes.push(node);
                });
                ctrl.categories.push(cat);
            });
        }));
    }
//    ctrl.package = {"sections": [{"list_of_menu": [{"id": 1, "text": "Tomato", "selectable": false, "tags": [1]}]}], "name": "Package Lunch", "price": "350", "title": "Happy hours", "description": "Delicious lunch"};

    $scope.addPackage = function () {
        var modalInstance = $modal.open({
            templateUrl: 'addPackage.html',
            controller: ('AddPackageCtrl', ['$scope', '$modalInstance', AddPackageCtrl]),
            size: 'med',
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function (packageJson) {
            PackageService.addPackage(packageJson).then(angular.bind(this, function then() {
                ctrl.package = PackageService.package;
                $state.go('app.apps.packagedetail', {packageId: PackageService.package._id}, {})
            }));
        });
    };

    ctrl.savePackage = function () {
        PackageService.addPackage(ctrl.package).then(angular.bind(this, function then() {
            console.log(CategoryService.categories);
            ctrl.package = PackageService.package;
            console.log(ctrl.categories);
        }));

    };


    function AddPackageCtrl($scope, $modalInstance) {

        $scope.ok = function () {
            var obj = new Object();
            var obj = {};
            obj.name = $scope.package.name;
            obj.title = $scope.package.title;
            obj.image = $scope.package.image;
            obj.desc = $scope.package.desc;
            obj.price = $scope.package.price;
            var packageJson = JSON.stringify(obj);
            $modalInstance.close(packageJson);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

    $scope.getPackageData = function() {
        PackageService.getPackageById($rootScope.$stateParams.packageId).then(function(result) {
            $scope.currentPackage = result;
        });
    }

    ctrl.addSection = function () {
        $scope.currentPackage.sections.push({});
    };

    ctrl.saveSections = function () {
        PackageService.addSectionToPackage($rootScope.$stateParams.packageId, $scope.currentPackage.sections).then(function(result) {
            console.log(result);
        });
    };
}

angular
        .module('urbanApp')
        .controller('packageCtrl', ['$scope', '$state', '$rootScope', '$modal', '$interval', 'COLORS', 'CategoryService', 'PackageService', packageCtrl]);
