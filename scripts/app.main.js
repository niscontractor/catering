'use strict';

angular
        .module('urbanApp')
        .controller('AppCtrl', ['ngTranslation','$scope', '$rootScope', '$http', '$localStorage',
            function AppCtrl(ngTranslation,$scope, $rootScope, $http, $localStorage) {

                var name = $localStorage.selectedLanguage;
                ngTranslation.use(name);
                $scope.mobileView = 767;
            

                if ($localStorage.role==0) {
                    $scope.isAdmin = true;
                }
                else {
                    $scope.isAdmin = false;
                }

                console.log($scope.isAdmin);

                $scope.app = {
                    name: 'Online Catering',
                    author: 'Nyasha',
                    version: '1.0.0',
                    year: (new Date()).getFullYear(),
                    layout: {
                        isSmallSidebar: false,
                        isChatOpen: false,
                        isFixedHeader: true,
                        isFixedFooter: false,
                        isBoxed: false,
                        isStaticSidebar: false,
                        isRightSidebar: false,
                        isOffscreenOpen: false,
                        isConversationOpen: false,
                        isQuickLaunch: false,
                        sidebarTheme: '',
                        headerTheme: ''
                    },
                    isMessageOpen: false,
                    isConfigOpen: false
                };

                if (angular.isDefined($localStorage.user)) {
                    $rootScope.user = $localStorage.user;
                }

                if (angular.isDefined($localStorage.layout)) {
                    $scope.app.layout = $localStorage.layout;
                } else {
                    $localStorage.layout = $scope.app.layout;
                }

                $scope.$watch('app.layout', function () {
                    $localStorage.layout = $scope.app.layout;
                }, true);

                $scope.getRandomArbitrary = function () {
                    return Math.round(Math.random() * 100);
                };
            }
        ]);
