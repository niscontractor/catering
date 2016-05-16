'use strict';

function packageCtrl($scope, $interval, COLORS, CategoryService) {
    var ctrl = this;

    $scope.getCategoryList = function () {

//TODO $rootScope.user.username
        CategoryService.getCategories('').then(angular.bind(this, function then() {
            console.log(CategoryService.categories);
            ctrl.categories = [];
            angular.forEach(CategoryService.categories, function (category) {
                var cat = {};
                cat.text = category.name;
                cat.id = category._id;
                cat.selectable = false;
                cat.nodes = [];
                var index = 0;
                angular.forEach(category.items, function (item) {
                    var node = {};
                    node.id = item._id;
                    node.selectable = false;   
                    node.text = item.name;
                    node.tags = [index];
                    index = index + 1;
                    cat.nodes.push(node);
                });
                ctrl.categories.push(cat);
            });
            console.log(ctrl.categories);
        }));
    }
//    in below array tags is necessary. assign object id inside tags to work drag and drop properly
    ctrl.categories1 = [
        {
            text: 'Soups',
            selectable: false,
            nodes: [
                {
                    id: 1,
                    text: 'Tomato',
                    selectable: false,
                    tags: [1]
                },
                {
                    id: 2,
                    text: 'Hot & Sour',
                    selectable: false,
                    tags: [2]
                }
            ]
        },
        {
            text: 'Starter',
            selectable: false,
            nodes: [
                {
                    id: 3,
                    text: 'Spring Roll',
                    selectable: false,
                    tags: [3]
                },
                {
                    id: 4,
                    selectable: false,
                    text: 'Harabhara Kabab',
                    tags: [4]
                },
                {
                    id: 5,
                    selectable: false,
                    text: 'Manchurian',
                    tags: [5]
                }
            ]
        }
    ];
    console.log(ctrl.categories1);
    ctrl.package = {sections: [{}]};
    ctrl.package = {"sections": [{"list_of_menu": [{"id": 1, "text": "Tomato", "selectable": false, "tags": [1]}]}], "name": "Package Lunch", "price": "350", "title": "Happy hours", "description": "Delicious lunch"};
    ctrl.addSection = function () {
        ctrl.package.sections.push({});
    };
    ctrl.savePackage = function () {
        console.log(JSON.stringify(ctrl.package))
    };
}

angular
        .module('urbanApp')
        .controller('packageCtrl', ['$scope', '$interval', 'COLORS', 'CategoryService', packageCtrl]);
