'use strict';

function mainAppCtrl($scope, $rootScope, $state, $localStorage, Auth) {	

	if (!Auth.isLoggedIn()) {
		$state.go('user.signin');
		return;
	};

	$scope.logoutUser = function() {
		$localStorage.$reset();
		$rootScope.user = '';
		Auth.setUser(null);
		$state.go('user.signin');
	}
}

angular
        .module('urbanApp')
        .controller('MainAppCtrl', ['$scope', '$rootScope', '$state', '$localStorage', 'Auth', mainAppCtrl]);