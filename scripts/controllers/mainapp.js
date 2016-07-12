'use strict';

function mainAppCtrl($scope, $rootScope, $state, $localStorage, Auth) {	

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
		
	}
}

angular
        .module('urbanApp')
        .controller('MainAppCtrl', ['$scope', '$rootScope', '$state', '$localStorage', 'Auth', mainAppCtrl]);