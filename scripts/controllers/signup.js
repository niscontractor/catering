'use strict';

function signupCtrl($state) {
    var ctrl = this;
    ctrl.register = function () {        
        if(ctrl.signUpForm.$valid){
            
        }
    };
}
angular
        .module('cateringApp')
        .controller('signupCtrl', ['$state', signupCtrl]);
