/**
 * Service that handles operations on local storage.
 */
//define(['angular'], function () {
var localStorageUtilityService = function ($log) {
    var service = {};
    /**
     * method prepared to store the value to locastorage
     * @param {string} key holds the name to which data is to be stored in database
     * @param {object} data holds the object which is to be stored in database
     */
    service.addToLocalStorage = function (key, data) {
        if (typeof (localStorage) == 'undefined') {
            return "Error";
            $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        } else {
            try {
                data = JSON.stringify(data);
                localStorage.setItem(key, data);
                return "Success";
            } catch (e) {
                if (e === QUOTA_EXCEEDED_ERR) {
                    $log.error("Quota exceeded!");
                }
                return "Error";
            }
            ;
        }
        ;
    };

    /**
     * service method to get the key value from localstorage
     * @param {string} key holds the name which is to be removed from local storage
     */
    service.removeFromLocalStorage = function (key) {
        if (typeof (localStorage) == 'undefined') {
            return "Error";
            $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        } else {
            try {
                localStorage.removeItem(key);
                return "Success";
            } catch (e) {
                if (e === QUOTA_EXCEEDED_ERR) {
                    $log.error("Quota exceeded!");
                }
                return "Error";
            }
            ;
        }
        ;
    };

    /**
     * service method to get the key value from localstorage
     * @param {string} key holds the name from which the value is to be fetch
     */
    service.getFromLocalStorage = function (key) {
        if (typeof (localStorage) == 'undefined') {
            return "Error";
            $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        } else {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                if (e === QUOTA_EXCEEDED_ERR) {
                    $log.error("Quota exceeded!");
                }
                return "Error";
            }
        }
    };

    /**
     * service method to get the key value from localstorage
     * @param {string} key holds the name from which is to be check
     */
    service.checkLocalStorageKey = function (key) {
        if (typeof (localStorage) == 'undefined') {
            return false;
            $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        } else {
            try {
                if (localStorage[key]) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                if (e === QUOTA_EXCEEDED_ERR) {
                    $log.error("Quota exceeded!");
                }
                return false;
            }
        }
    };

    return service;
};
angular.module('urbanApp').factory('localStorageUtilityService', ['$log', localStorageUtilityService]);

//});

