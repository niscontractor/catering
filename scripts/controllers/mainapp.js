'use strict';

function mainAppCtrl(ngTranslation,$scope, $rootScope, $state, $localStorage, Auth,$timeout) {	

	if (!Auth.isLoggedIn()) {
		$state.go('user.signin');
		return;
	};


	$scope.logoutUser = function() {
		
		$rootScope.user = '';
		
		Auth.setUser(null);
		if ($localStorage.role==0) {
			$state.go('user.adminsignin');
		}
		else {
			$state.go('user.signin');
		}
		$localStorage.$reset();
		$timeout(function () {
        	window.location.reload();
    	}, 150);
	}
	$scope.changeLanguage = function(name){
        $localStorage.selectedLanguage = name;    
        ngTranslation.use(name);
        if (name=='en') {
            $rootScope.isEnglish = true;
            $rootScope.isSpanish = false;
            $localStorage.selectedLanguage = name;
        }
        else {
            $rootScope.isEnglish = false;
            $rootScope.isSpanish = true;
            $localStorage.selectedLanguage = name;
        }
    }

	}

angular
        .module('urbanApp')
        .controller('MainAppCtrl', ['ngTranslation','$scope', '$rootScope', '$state', '$localStorage', 'Auth','$timeout', mainAppCtrl]);