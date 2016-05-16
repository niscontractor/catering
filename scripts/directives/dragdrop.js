var dragDropDir = function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            formula: "=",
            treeview: '=',
            selectedData: '=',
            categories: '='
        },
        link: function (scope, element, attrs) {
            $(element).bind("DOMSubtreeModified", function () {
                if (attrs.dragabble) {
                    $timeout(function () {
                        $(element).find('li').each(function () {
                            if ($(this).find('.badge').length != 0) {
                                $(this).draggable({revert: "invalid", helper: "clone", start: function (e, ui) {

                                        ui.helper.width($(this).width());
                                    }});
                            }
                        });
                    });
                }
            });

            if (attrs.droppable) {
                //set initial droppable elements
                scope.$watch('selectedData', function (data) {
                    if (data != null) {
                        angular.forEach(data, function (obj) {
                            $timeout(function () {
                                if ($(element).find('.badge:contains(' + obj.id + ')').length == 0) {
                                    var template = '<li class="list-group-item node-"><span class="indent"></span><span class="icon glyphicon"></span><span class="icon node-icon"></span>' +
                                            obj.text
                                            + '<span class="badge">' + obj.id + '</span></li>';
                                    $(template).appendTo(element);
                                }
                            })
                        });
                    }
                });
                $(element).droppable({
                    accept: ".list-group-item",
                    drop: function (event, ui) {
                        scope.$apply(function () {
                            if (scope.selectedData == null) {
                                scope.selectedData = [];
                            }
                            if (scope.categories != null) {
                                angular.forEach(scope.categories, function (category) {
                                    angular.forEach(category.nodes, function (node) {
                                        if (node.id == Number(ui.draggable.find('.badge').text())) {
                                            scope.selectedData.push(angular.copy(node));
                                        }
                                    });
                                })
                            }
                        });

                        var draggableObj = $(ui.draggable[0]).clone();
                        $(draggableObj).appendTo(this);
//                        $("<li class='list-group-item li-formula'></li>").text(ui.draggable.text()).appendTo(this);
//                        ui.draggable.remove();
                    }
                });
            }
            ;
            scope.$watch("treeview", function (data) {
                if (data != null) {
                    $(element).treeview({
                        data: data,
                        levels: 99,
                        showTags: true
                    });
                }
            }, true);
        }
    };
};

angular.module('urbanApp').directive('dragDrop', ['$timeout', dragDropDir]);