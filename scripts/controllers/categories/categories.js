'use strict';

function categoryCtrl($scope, $modal, $log, CategoryService) {
    var ctrl = this;

    $scope.getCategoryList = function () {
        //api call to get category list
        console.log('hello')
        ctrl.categoryList = [
            {'id': 1, 'title': 'Soup1', 'items': ['Chilli1', 'Manchow1','sdasd','asdasd']},
            {'id': 2, 'title': 'Soup2', 'items': ['Chilli2', 'Manchow2']},
            {'id': 3, 'title': 'Soup3', 'items': ['Chilli3', 'Manchow3']},
            {'id': 4, 'title': 'Soup4', 'items': ['Chilli4', 'Manchow4']}
        ];
    }

    ctrl.addCategory = function () {
        var modalInstance = $modal.open({
            templateUrl: 'addCategory.html',
            controller: ('AddCategoryCtrl', ['$scope', '$modalInstance', AddCategoryCtrl]),
            size: 'med'
        });

        modalInstance.result.then(function () {
            $scope.getCategoryList();
            var index = ctrl.categoryList.length + 1;
            var newObj = {'id': index, 'title': 'Soup' + index};
            ctrl.categoryList.push(newObj);
        });
    };


    ctrl.addCategoryItem = function (id) {
        console.log('category: ', id);
        var modalInstance = $modal.open({
            templateUrl: 'addCategoryItem.html',
            controller: ('AddItemCtrl', ['$scope', '$modalInstance', 'categoryId', AddItemCtrl]),
            size: 'med',
            resolve: {
                categoryId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.getCategoryList();
        });
    };


}

function AddCategoryCtrl($scope, $modalInstance) {

    $scope.ok = function () {
        console.log('api call to add new category');
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function AddItemCtrl($scope, $modalInstance, categoryId) {

    $scope.ok = function () {
        console.log('api call to add item to list', categoryId);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

angular
        .module('urbanApp')
        .controller('categoryCtrl', ['$scope', '$modal', '$log', 'CategoryService', categoryCtrl]);
