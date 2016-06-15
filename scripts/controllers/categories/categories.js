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

    ctrl.deleteCategory = function (category) {
        CategoryService.deleteCategory(category).then(angular.bind(this, function then() {
            console.log(CategoryService.category);
        }));
    };

    ctrl.addCategoryItem = function (id) {
        console.log('category: ', id);
        var modalInstance = $modal.open({
            templateUrl: 'addCategoryItem.html',
            controller: ('AddItemCtrl', ['$rootScope', '$scope', '$modalInstance', 'categoryId', AddItemCtrl]),
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
        console.log(item);
        console.log('categoryItem: ', item.name + " -" + category._id + "-");
        var modalInstance = $modal.open({
            templateUrl: 'editCategoryItem.html',
            controller: ('EditItemCtrl', ['$rootScope', '$scope', '$modalInstance', 'categoryItem', EditItemCtrl]),
            size: 'med',
            resolve: {
                categoryItem: function () {
                    var itemCategory = new Object();
                    itemCategory.item = item.name;
                    itemCategory.name = item.name;
                    itemCategory.desc = item.desc;
                    itemCategory.qty = item.qty;
                    itemCategory.price = item.price;
                    itemCategory.available = item.available;
                    itemCategory.category = category._id;
                    itemCategory.image = item.image;
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

    ctrl.deleteCategoryItem = function (item, category) {
        var ans = confirm("Do you want to delete ?");
        if (ans == true) {
            CategoryService.deleteCategoryItem(category._id, item.name).then(angular.bind(this, function then() {
                CategoryService.getCategories('').then(angular.bind(this, function then() {
                    ctrl.categoryList = CategoryService.categories;
                }));
            }));
        }
        ;
    }

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
        obj.price = $scope.category.price;
        obj.id = $scope.category._id;
        var category = JSON.stringify(obj);
        $modalInstance.close(category);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function AddItemCtrl($rootScope, $scope, $modalInstance, categoryId) {

    $scope.uploadPhoto = {};
    $scope.$file;
    $scope.showProgressBar = false;
    $scope.fileUploaded = false;
    $scope.allowFileUpload = false;
    $scope.profilePhoto = '';

    $scope.uploadCategoryImage = {
        target: $rootScope.apipath + '/category/' + categoryId._id + '/item-upload',
        singleFile: true,
        testChunks: false,
    };

    $scope.uploadImage = function ($file, $event, $flow) {
        $scope.fileUploaded = true;
        if ($scope.allowFileUpload) {
            $flow.upload();
            console.log($file);
            $scope.showProgressBar = true;
        }
    };
    $scope.uploadImageSuccess = function ($file, $message, $flow) {
        console.log('success');

        $scope.profilePhoto = JSON.parse($message);
        $scope.showProgressBar = false;
    };
    $scope.uploadImageFailure = function ($file, $message, $flow) {
        console.log('failed');
        $scope.showProgressBar = false;
        //addMessage("Upload Failed");
    };
    $scope.uploadImageProgress = function ($file, $flow) {
        $scope.showProgressBar = true;
    };
    $scope.imageAdded = function ($file, $event, $flow) {
        $scope.$file = $file;
        var imageExtension = ["png", "gif", "jpg", "jpeg"];
        if ((imageExtension.indexOf($file.getExtension())) < 0) {
            //addMessage("Only PNG,GIF,JPG,JPEG files allowed.Please upload valid file.");
            console.log('inside image extension');
            $scope.allowFileUpload = false;
        } else {
            $scope.allowFileUpload = true;
        }
    };

    $scope.ok = function () {
        var obj = new Object();
        obj.name = $scope.categoryItem.name;
        obj.desc = $scope.categoryItem.desc;
        obj.qty = $scope.categoryItem.qty;
        obj.price = $scope.categoryItem.price;
        obj.available = $scope.categoryItem.available;
        obj.image = $scope.profilePhoto.filename || '';
        obj.categoryName = categoryId._id;
        $modalInstance.close(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function EditItemCtrl($rootScope, $scope, $modalInstance, categoryItem) {
    $scope.categoryItem = categoryItem;
    $scope.profilePhoto = '';

    console.log(categoryItem);

    $scope.uploadPhoto = {};
    $scope.$file;
    $scope.showProgressBar = false;
    $scope.fileUploaded = false;
    $scope.allowFileUpload = false;

    $scope.uploadCategoryImage = {
        target: $rootScope.apipath + '/category/' + categoryItem.category + '/item-upload',
        singleFile: true,
        testChunks: false,
    };

    $scope.uploadImage = function ($file, $event, $flow) {
        $scope.fileUploaded = true;
        if ($scope.allowFileUpload) {
            $flow.upload();
            $scope.showProgressBar = true;
        }
    };
    $scope.uploadImageSuccess = function ($file, $message, $flow) {
        $scope.profilePhoto = JSON.parse($message);
        $scope.showProgressBar = false;
    };
    $scope.uploadImageFailure = function ($file, $message, $flow) {
        console.log('failed');
        $scope.showProgressBar = false;
    };
    $scope.uploadImageProgress = function ($file, $flow) {
        $scope.showProgressBar = true;
    };
    $scope.imageAdded = function ($file, $event, $flow) {
        $scope.$file = $file;
        var imageExtension = ["png", "gif", "jpg", "jpeg"];
        if ((imageExtension.indexOf($file.getExtension())) < 0) {
            //addMessage("Only PNG,GIF,JPG,JPEG files allowed.Please upload valid file.");
            console.log('inside image extension');
            $scope.allowFileUpload = false;
        } else {
            $scope.allowFileUpload = true;
        }
    };



    $scope.ok = function () {
        var obj = new Object();
        obj.name = $scope.categoryItem.name;
        obj.desc = $scope.categoryItem.desc;
        obj.qty = $scope.categoryItem.qty;
        obj.price = $scope.categoryItem.price;
        obj.available = $scope.categoryItem.available;
        obj.categoryName = $scope.categoryItem.category;
        obj.categorItemName = $scope.categoryItem.item;

        if ($scope.profilePhoto && $scope.profilePhoto.filename) {
            obj.image = $scope.profilePhoto.filename;
        }

        $modalInstance.close(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

angular
        .module('urbanApp')
        .controller('categoryCtrl', ['$scope', '$modal', '$log', '$rootScope', 'CategoryService', categoryCtrl]);
