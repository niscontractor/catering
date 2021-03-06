'use strict';

function packageCtrl(ngTranslation,$localStorage,$scope, $state, $rootScope, $modal, $modal$interval, COLORS, CategoryService, PackageService) {
    
    var name = $localStorage.selectedLanguage;
    ngTranslation.use(name);
    var ctrl = this;
    $scope.editPackage = function () {
        alert(5);
        console.log("-" + $rootScope.packageId);
        var modalInstance = $modal.open({
            templateUrl: 'editpackage.html',
            controller: ('EditPackageCtrl', ['$scope', '$modalInstance', '$rootScope', EditPackageCtrl]),
            size: 'med',
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function (packageJson) {
            console.log("--after edit----" + packageJson);
            PackageService.editPackage(packageJson).then(angular.bind(this, function then() {
                ctrl.package = PackageService.package;
                $state.go('app.apps.packagedetail', {packageId: $rootScope.packageId}, {});
                console.log("--after edit----" + $rootScope.packageId);
            }));
        });
    };

    function EditPackageCtrl($scope, $modalInstance, $rootScope) {
        $scope.showNewPackageUploadedImage = true;
        $scope.showNewPackageRemove = false;
        console.log("--- in edit ctr : " + $rootScope.packageId);
        PackageService.getPackageById($rootScope.packageId).then(function (result) {
            $scope.package = result;
        });

        $scope.removeNewPackageImage = function () {
            $scope.showNewPackageUploadedImage = false;
            $scope.showNewPackageRemove = false;
        }

        $scope.uploadPhoto = {};
        $scope.$file;
        $scope.showProgressBar = false;
        $scope.fileUploaded = false;
        $scope.allowFileUpload = false;
        $scope.profilePhoto = '';

        $scope.uploadCategoryImage = {
            target: $rootScope.apipath +  '/image_upload',
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
            //console.log('success');
            $scope.showNewPackageRemove = true;
            $scope.showNewPackageUploadedImage = true;
            $scope.profilePhoto = JSON.parse($message);
            $scope.fileName = $scope.profilePhoto.filename;
            $scope.showProgressBar = false;
        };

        $scope.uploadImageFailure = function ($file, $message, $flow) {
            //console.log('failed');
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
            var obj = {};
            obj.name = $scope.package.name;
            obj.title = $scope.package.title;
            obj.image = $scope.fileName;
            obj.desc = $scope.package.desc;
            obj.price = $scope.package.price;
            obj.qty = $scope.package.qty;
            obj._id = $rootScope.packageId;
            if ($scope.showNewPackageUploadedImage == false) {
                obj.image = "";
            }
            var packageJson = JSON.stringify(obj);
            console.log(obj);
            $modalInstance.close(packageJson);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            $state.go('app.apps.gallery');
        };
    }

    $scope.getPackageData = function () {
        PackageService.getPackageById($rootScope.$stateParams.packageId).then(function (result) {
            $scope.currentPackage = result;
            console.log(JSON.stringify(result));
        });
    }

    ctrl.addSection = function () {
        $scope.currentPackage.sections.push({});
        console.log(JSON.stringify(ctrl.package.sections));
    };

    ctrl.saveSections = function () {
        PackageService.addSectionToPackage($rootScope.$stateParams.packageId, $scope.currentPackage.sections).then(function (result) {
            $state.go('app.apps.gallery');
        });
    };
}

angular
        .module('urbanApp')
        .controller('packageCtrl', ['ngTranslation','$localStorage','$scope', '$state', '$rootScope', '$modal', '$interval', 'COLORS', 'CategoryService', 'PackageService', packageCtrl]);
