'use strict';

function categoryCtrl($scope, $modal, $log, $rootScope, CategoryService) {
    var ctrl = this;

    $scope.getCategoryList = function () {

//TODO $rootScope.user.username
        CategoryService.getCategories('').then(angular.bind(this, function then() {
            console.log(CategoryService.categories);
            ctrl.categoryList = CategoryService.categories;
        }));
    }

    ctrl.editCategory = function (category) {
        var modalInstance = $modal.open({
            templateUrl: 'editCategory.html',
            controller: ('EditCategoryCtrl', ['$scope', '$modalInstance', 'category', EditCategoryCtrl]),
            size: 'med',
            resolve: {
                category: function () {
                    return category;
                }
            }
        });

        modalInstance.result.then(function (category) {
            CategoryService.editCategories(category).then(angular.bind(this, function then() {

            }));
        });
    }

    ctrl.addCategory = function () {
        var modalInstance = $modal.open({
            templateUrl: 'addCategory.html',
            controller: ('AddCategoryCtrl', ['$scope', '$modalInstance', AddCategoryCtrl]),
            size: 'med'
        });

        modalInstance.result.then(function (category) {
            CategoryService.addCategories(category).then(angular.bind(this, function then() {
                console.log(CategoryService.category);
                ctrl.categoryList.push(CategoryService.category);
            }));
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

        modalInstance.result.then(function (categoryItem) {
            ctrl.categoryList
            CategoryService.addCategoryItem(categoryItem).then(angular.bind(this, function then() {
                console.log(CategoryService.categoryItem);
                CategoryService.getCategories('').then(angular.bind(this, function then() {
                    console.log(CategoryService.categories);
                    ctrl.categoryList = CategoryService.categories;
                }));
            }));
        });
    };

    ctrl.editCategoryItem = function (item, category) {
        console.log('categoryItem: ', item.name + " -" + category.name + "-");
        var modalInstance = $modal.open({
            templateUrl: 'editCategoryItem.html',
            controller: ('EditItemCtrl', ['$scope', '$modalInstance', 'categoryItem', EditItemCtrl]),
            size: 'med',
            resolve: {
                categoryItem: function () {
                    var itemCategory = new Object();
                    itemCategory.item = item.name;
                    itemCategory.name = item.name;
                    itemCategory.desc = item.desc;
                    itemCategory.category = category.name;
                    console.log(JSON.stringify(itemCategory));
                    return itemCategory;
                }
            }
        });

        modalInstance.result.then(function (categoryItem) {
            CategoryService.editCategoryItem(categoryItem).then(angular.bind(this, function then() {
                CategoryService.getCategories('').then(angular.bind(this, function then() {
                    ctrl.categoryList = CategoryService.categories;
                }));
            }));
        });
    };


}

function AddCategoryCtrl($scope, $modalInstance) {

    $scope.ok = function () {
        var obj = new Object();
        obj.name = $scope.category.name;
        obj.desc = $scope.category.desc;
        var category = JSON.stringify(obj);
        $modalInstance.close(category);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function EditCategoryCtrl($scope, $modalInstance, category) {
    $scope.category = category;
    $scope.ok = function () {
        var obj = new Object();
        obj.name = $scope.category.name;
        obj.desc = $scope.category.desc;
        obj.id = $scope.category._id;
        var category = JSON.stringify(obj);
        $modalInstance.close(category);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function AddItemCtrl($scope, $modalInstance, categoryId) {
    $scope.ok = function () {
        var obj = new Object();
        obj.name = $scope.categoryItem.name;
        obj.desc = $scope.categoryItem.desc;
        obj.categoryName = categoryId.name;
        $modalInstance.close(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function EditItemCtrl($scope, $modalInstance, categoryItem) {
    $scope.categoryItem = categoryItem;
    console.log("categoryItem " + categoryItem);
    $scope.ok = function () {
        var obj = new Object();
        obj.name = $scope.categoryItem.name;
        obj.desc = $scope.categoryItem.desc;
        obj.categoryName = $scope.categoryItem.category;
        obj.categorItemName = $scope.categoryItem.item;
        $modalInstance.close(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

angular
        .module('urbanApp')
        .controller('categoryCtrl', ['$scope', '$modal', '$log', '$rootScope', 'CategoryService', categoryCtrl]);
