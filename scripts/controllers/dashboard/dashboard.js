'use strict';

function dashboardCtrl($scope, $rootScope, $state, $localStorage, $interval, $timeout, ReadJson, CompanyService, Common) {
    var ctrl = this;
    ctrl.company = {};
    ctrl.selectedTab = 'company';

    $scope.initCompanyProfile = function () {
        if (!angular.isDefined($rootScope.company_id)) {
            $rootScope.company_id = $localStorage.company_id;
        }
        CompanyService.getCompanyById($rootScope.company_id).then(function (response) {
            ctrl.company = response;
        }).catch(function (response) {

        });
    }

    ReadJson.getCuisines().then(angular.bind(this, function then() {
        ctrl.typeOfCuisines = ReadJson.typeOfCuisines;
    }));

    ReadJson.getSpecialNeeds().then(angular.bind(this, function then() {
        ctrl.specialNeeds = ReadJson.specialNeeds;
    }));

    ReadJson.getTypeOfEvents().then(angular.bind(this, function then() {
        ctrl.typeOfEvents = ReadJson.typeOfEvents;
    }));

    ReadJson.getOfferedServices().then(angular.bind(this, function then() {
        ctrl.servicesOffered = ReadJson.servicesOffered;
    }));

    ReadJson.getTypeOfServices().then(angular.bind(this, function then() {
        ctrl.typeOfServices = ReadJson.typeOfServices;
    }));

    ctrl.selectTab = function (form, selectedTab) {
        ctrl.selectedTab = selectedTab;
    };

    ctrl.register = function () {
//        submit data
        CompanyService.saveOrUpdate(ctrl.company).then(function (response) {
            $rootScope.addMessage('Company updated successfully', 'success');
            $state.go('app.apps.calendar');
        }).catch(function (response) {
            $rootScope.addMessage('Company update failed', 'error');
        });
    }

    //upload image
    ctrl.uploadPhoto = {};
    ctrl.$file;
    ctrl.showProgressBar = false;
    ctrl.fileUploaded = false;
    ctrl.allowFileUpload = false;

    ctrl.uploadLogo = {
        target: $rootScope.apipath + '/company/logo/' + $localStorage.company_id,
        singleFile: true,
        testChunks: false,
    };

    ctrl.uploadProfilePhoto = {
        target: $rootScope.apipath + '/company/profile-pic/' + $localStorage.company_id,
        singleFile: true,
        testChunks: false
    };

    ctrl.uploadBanner = {
        target: $rootScope.apipath + '/company/banner/' + $localStorage.company_id,
        singleFile: true,
        testChunks: false
    };

    ctrl.uploadImage = function ($file, $event, $flow) {
        ctrl.fileUploaded = true;
        if (ctrl.allowFileUpload) {
            $flow.upload();
        }
    };
    ctrl.uploadImageSuccess = function ($file, $message, $flow) {
        console.log('success');
        $timeout(function () {
            ctrl.showProgressBar = false;
        }, 500);
        ctrl.profilePhoto = JSON.parse($message);

        Common.getUserById($localStorage.user.id).then(function (response) {
            $rootScope.user = response;
            $localStorage.user = $rootScope.user;
        }).catch(function (response) {
            $rootScope.addMessage('Invalid User.', 'error');
        });
    };
    ctrl.uploadImageFailure = function ($file, $message, $flow) {
        console.log('failed');
        $timeout(function () {
            ctrl.showProgressBar = false;
        }, 500);
        //addMessage("Upload Failed");
    };
    ctrl.uploadImageProgress = function ($file, $flow) {
        ctrl.showProgressBar = true;
    };
    ctrl.imageAdded = function ($file, $event, $flow) {
        ctrl.$file = $file;
        var imageExtension = ["png", "gif", "jpg", "jpeg"];
        if ((imageExtension.indexOf($file.getExtension())) < 0) {
            //addMessage("Only PNG,GIF,JPG,JPEG files allowed.Please upload valid file.");
            console.log('inside image extension');
            ctrl.allowFileUpload = false;
        } else {
            ctrl.allowFileUpload = true;
        }
    };

}

angular
        .module('urbanApp')
        .controller('dashboardCtrl', ['$scope', '$rootScope', '$state', '$localStorage', '$interval', '$timeout', 'ReadJson', 'CompanyService', 'Common', dashboardCtrl]);
