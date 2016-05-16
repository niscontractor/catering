'use strict';

function dashboardCtrl($scope, $interval, $timeout, ReadJson, CompanyService) {
    var ctrl = this;
    ctrl.companyDetails = {company_id: '1', delivery: true};
    ctrl.selectedTab = 'company';

    ctrl.initCompanyProfile = function () {

    }

    ReadJson.getCuisines().then(angular.bind(this, function then() {
        ctrl.typeOfCuisines = ReadJson.cuisines;
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
        console.log('inside select Tab')
        if (form.$valid) {
            ctrl.selectedTab = selectedTab;
        }
    };

    ctrl.register = function () {
//        submit data
        console.log('inside register', ctrl.companyDetails);
        CompanyService.saveOrUpdate(ctrl.companyDetails).then(function(){
            
        }).catch(function(){
            
        });
    }

        //upload image
        ctrl.uploadPhoto = {};
        ctrl.$file;
        ctrl.showProgressBar = false;
        ctrl.fileUploaded = false;
        ctrl.allowFileUpload = false;
        ctrl.uploadLogo = {
            //url for api call to upload file
            target: 'api-url-to-fileupload',
            singleFile: true,
            testChunks: false
        }

        ctrl.uploadProfilePhoto = {
            //url for api call to upload file
            target: 'api-url-to-fileupload',
            singleFile: true,
            testChunks: false
        }

        ctrl.uploadBanner = {
            //url for api call to upload file
            target: 'api-url-to-fileupload',
            singleFile: true,
            testChunks: false
        }

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
        .controller('dashboardCtrl', ['$scope', '$interval', '$timeout', 'ReadJson', 'CompanyService', dashboardCtrl]);
