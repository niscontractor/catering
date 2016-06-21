'use strict';

function categoryCtrl(SweetAlert, $scope, $modal, $log, ReadJson, $rootScope, CategoryService) {
    var ctrl = this;
    $scope.getCategoryList = function () {

//TODO $rootScope.user.username
        CategoryService.getCategories('').then(angular.bind(this, function then() {
            console.log(CategoryService.categories);
            ctrl.categoryList = CategoryService.categories;
        }));
        }

        ReadJson.getTags().then(angular.bind(this, function then() {
        $rootScope.tags = ReadJson.tags;
    }));

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

        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this category!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false},
        function (isConfirm) {
            if (isConfirm) {
                SweetAlert.swal("Deleted!", "Your category has been deleted.", "success");
                CategoryService.deleteCategory(category).then(angular.bind(this, function then() {
                    console.log(CategoryService.category);
                    CategoryService.getCategories('').then(angular.bind(this, function then() {
                        console.log(CategoryService.categories);
                        ctrl.categoryList = CategoryService.categories;
                    }));

                }));
            }

            else {
                SweetAlert.swal("Cancelled", "Your category is safe :)", "error");
            }
        });
    };

    ctrl.addCategoryItem = function (id) {
        var modalInstance = $modal.open({
            templateUrl: 'addCategoryItem.html',
            controller: ('AddItemCtrl', ['SweetAlert', '$rootScope', '$scope', '$modalInstance', 'categoryId', AddItemCtrl]),
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
        var modalInstance = $modal.open({
            templateUrl: 'editCategoryItem.html',
            controller: ('EditItemCtrl', ['SweetAlert', '$rootScope', '$scope', '$modalInstance', 'categoryItem', EditItemCtrl]),
            size: 'med',
            resolve: {
                categoryItem: function () {
                    var itemCategory = new Object();
                    itemCategory.item = item.name;
                    itemCategory.name = item.name;
                    itemCategory.desc = item.desc;
                    itemCategory.qty = item.qty;
                    itemCategory.price = item.price;
                    itemCategory.tag = item.tag;
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
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this item!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false},
        function (isConfirm) {
            if (isConfirm) {
                SweetAlert.swal("Deleted!", "Your item has been deleted.", "success");
                CategoryService.deleteCategoryItem(category._id, item.name).then(angular.bind(this, function then() {
                    CategoryService.getCategories('').then(angular.bind(this, function then() {
                        ctrl.categoryList = CategoryService.categories;
                    }));
                }));
            }

            else {
                SweetAlert.swal("Cancelled", "Your item is safe :)", "error");
            }
        });

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



function AddItemCtrl(SweetAlert,$rootScope, $scope, $modalInstance, categoryId) {
    $scope.categoryItemavailable = true;
    $scope.showNewItemUploadedImage = false;
    $scope.showNewItemRemove = false;
    $scope.tags = $rootScope.tags;
    $scope.uploadPhoto = {};
    $scope.$file;
    $scope.showProgressBar = false;
    $scope.fileUploaded = false;
    $scope.allowFileUpload = false;
    $scope.profilePhoto = '';

//     $scope.validate = function (file) {
//   if (file.size > 10) {
//     $scope.errors.push({file:file, error: "file is too big"});
//     console.log("error");
//     return false;
//   }
//   return true;
// }

    $scope.uploadCategoryImage = {
        target: $rootScope.apipath + '/category/' + categoryId._id + '/item-upload/',
        singleFile: true,
        testChunks: false,
        chunkSize: 1024*1024*5
    };

    $scope.uploadImage = function ($file, $event, $flow) {
        $scope.fileUploaded = true;
        if ($scope.allowFileUpload) {
            $flow.upload();
            $scope.showProgressBar = true;
        }
    };
    $scope.uploadImageSuccess = function ($file, $message, $flow) {
        console.log('success');

        $scope.profilePhoto = JSON.parse($message);
        $scope.showProgressBar = false;
        $scope.showNewItemRemove = true;
        $scope.showNewItemUploadedImage = true;
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
        if ($file.size > 1024 * 1024 * 5) {
            SweetAlert.swal("Failed!", "Upload Image less than 5MB");
            console.log("Can not upload");
            return false;
        }
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
        obj.available = $scope.categoryItemavailable;
        obj.image = $scope.profilePhoto.filename || '';
        obj.tag = $scope.categoryItem.tag;
        obj.categoryName = categoryId._id;
        $modalInstance.close(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


function EditItemCtrl(SweetAlert,$rootScope, $scope, $modalInstance, categoryItem) {
    $scope.showOldItemImage = true;
    $scope.categoryItem = categoryItem;
    $scope.profilePhoto = '';
    $scope.tags = $rootScope.tags;
    $scope.uploadPhoto = {};
    $scope.$file;
    $scope.showProgressBar = false;
    $scope.fileUploaded = false;
    $scope.allowFileUpload = false;

    $scope.uploadCategoryImage = {
        target: $rootScope.apipath + '/category/' + categoryItem.category + '/item-upload',
        singleFile: true,
        testChunks: false,
        chunkSize: 1024*1024*5
    };

    $scope.uploadImage = function ($file, $event, $flow) {
        $scope.showOldItemImage = false;
        $scope.fileUploaded = true;
        if ($scope.allowFileUpload) {
            $flow.upload();
            $scope.showProgressBar = true;
        }

    };
    $scope.uploadImageSuccess = function ($file, $message, $flow) {
        $scope.showOldItemImage = false;
        $scope.profilePhoto = JSON.parse($message);
        $scope.showProgressBar = false;

    };
    $scope.uploadImageFailure = function ($file, $message, $flow) {
        console.log('failed');
        $scope.showOldItemImage = true;
        $scope.showProgressBar = false;
    };
    $scope.uploadImageProgress = function ($file, $flow) {
        $scope.showProgressBar = true;
    };
    $scope.imageAdded = function ($file, $event, $flow) {
        $scope.$file = $file;
        if ($file.size > 1024 * 1024 * 5) {
            SweetAlert.swal("Failed!", "Upload Image less than 5MB");
            console.log("Can not upload");
            return false;
        }
        var imageExtension = ["png", "gif", "jpg", "jpeg"];
        if ((imageExtension.indexOf($file.getExtension())) < 0) {
            //addMessage("Only PNG,GIF,JPG,JPEG files allowed.Please upload valid file.");
            console.log('inside image extension');
            $scope.allowFileUpload = false;
        } else {
            $scope.allowFileUpload = true;
        }
        $scope.showNewItemRemove = true;

    };

    $scope.deleteItemImage = function () {
        console.log("deleted");
        $scope.categoryItem.image = "";
        $scope.isImageAdded = false;

    }



    $scope.ok = function () {
        var obj = new Object();
        obj.name = $scope.categoryItem.name;
        obj.desc = $scope.categoryItem.desc;
        obj.qty = $scope.categoryItem.qty;
        obj.price = $scope.categoryItem.price;
        obj.available = $scope.categoryItem.available;
        obj.categoryName = $scope.categoryItem.category;
        obj.categorItemName = $scope.categoryItem.item;
        obj.tag = $scope.categoryItem.tag;

        if ($scope.profilePhoto && $scope.profilePhoto.filename) {
            obj.image = $scope.profilePhoto.filename;
        }
        if ($scope.isImageAdded == false) {
            obj.image = "";
        }

        $modalInstance.close(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

angular
        .module('urbanApp')
        .controller('categoryCtrl', ['SweetAlert', '$scope', '$modal', '$log', 'ReadJson', '$rootScope', 'CategoryService', categoryCtrl]);
