'use strict';

function CalendarCtrl($modal,$scope, $compile, uiCalendarConfig, OrderService) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.events = [];

    $scope.initCalendar = function () {
        OrderService.today().then(function(response) {
            console.log(response);
            $scope.response = response;
            for(var row in response) {
                $scope.events.push({
                    id:response[row].order_id,
                    title: response[row].order_event,
                    start: new Date(),
                    listColor: 'danger',
                    className: ['event-danger', 'event-name-light'],
                    customer_name : response[row].customer_name,
                    customer_address : response[row].customer_address,
                    order_location : response[row].customer_city,
                    customer_pin : response[row].customer_pincode,
                    customer_state : response[row].customer_state,
                    totalAmount : response[row].totalAmount,
                    items : response[row].item_info
                });

                // $scope.events.items.push('totalPrice',$scope.events.items[row].totalNumber*$scope.events.items[row].itemPrice);
            }
            console.log($scope.events);
        });

        // OrderService.month().then(function(response) {
        //     $scope.eventSources = response;
        // });
    }

    $scope.orderModal = function(index){
        
        var modalInstance = $modal.open({
            templateUrl: 'orderInfo.html',
            controller: ('orderInfoEventCtrl', ['$scope', '$modalInstance', '$rootScope','object', orderInfoEventCtrl]),
            resolve: {
                object: function () {
                    return $scope.response[index];
                }
            },
            size: 'med',
            keyboard: false,
            backdrop: 'static'
        });
    }

    function orderInfoEventCtrl($scope,$modalInstance,$rootScope,object){
        $scope.e = object;
        $scope.e.id = object.order_id;
        $scope.e.items = object.item_info;
        console.log(object);

         $scope.closeModal = function(){
            $modalInstance.close();
        }
    }

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
        className: 'gcal-event', // an option!
        currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{
                title: 'Feed Me ' + m,
                start: s + (50000),
                end: s + (100000),
                allDay: false,
                className: ['customFeed', 'event-name-light']
            }];
        callback(events);
    };

    $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [
            {
                type: 'party',
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                type: 'party',
                title: 'Lunch 2',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                type: 'party',
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
            }
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function (date, jsEvent, view) {
        $scope.alertMessage = (date.title + ' was clicked ');
        $scope.orderInfoData = date;
        var modalInstance = $modal.open({
            templateUrl: 'orderInfo.html',
            controller: ('orderInfoCtrl', ['$scope', '$modalInstance', '$rootScope','order', orderInfoCtrl]),
            resolve: {
                order: function () {
                    return date;
                }
            },
            size: 'med',
            keyboard: false,
            backdrop: 'static'
        });

        
  };

    function orderInfoCtrl($scope,$modalInstance,$rootScope,order){
        console.log(order);
        $scope.e = order;
        $scope.closeModal = function(){
            $modalInstance.close();
        }
    }

    /* alert on Drop */
    $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function (sources, source) {
        var canAdd = 0;
        angular.forEach(sources, function (value, key) {
            if (sources[key] === source) {
                sources.splice(key, 1);
                canAdd = 1;
            }
        });
        if (canAdd === 0) {
            sources.push(source);
        }
    };
    /* add custom event*/
    $scope.addEvent = function () {
        $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['event-primary', 'event-name-light'],
            listColor: 'default'
        });
    };
    /* remove event */
    $scope.remove = function (index) {
        $scope.events.splice(index, 1);
    };
    /* Change View */
    $scope.changeView = function (view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
    };
    /* Change View */
    $scope.renderCalender = function (calendar) {
        if (uiCalendarConfig.calendars[calendar]) {
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };
    /* Render Tooltip */
    $scope.eventRender = function (event, element, view) {
        element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 550,
            editable: false,
            header: {
                left: 'title',
                right: 'month,agendaWeek,agendaDay today prev,next',
            },
            buttonIcons: {
                prev: ' fa fa-caret-left',
                next: ' fa fa-caret-right',
            },
            droppable: false, // this allows things to be dropped onto the calendar !!!
            axisFormat: 'h:mm',
            columnFormat: {
                month: 'ddd', // Mon
                week: 'ddd D', // Mon 7
                day: 'dddd M/d', // Monday 9/7
                agendaDay: 'dddd D'
            },
            allDaySlot: false,
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };

    $scope.changeLang = function () {
        if ($scope.changeTo === 'Hungarian') {
            $scope.uiConfig.calendar.dayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
            $scope.uiConfig.calendar.dayNamesShort = ['Vas', 'Hét', 'Kedd', 'Sze', 'Csüt', 'Pén', 'Szo'];
            $scope.changeTo = 'English';
        } else {
            $scope.uiConfig.calendar.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.uiConfig.calendar.dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            $scope.changeTo = 'Hungarian';
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}

angular
        .module('urbanApp')
        .controller('CalendarCtrl', ['$modal','$scope', '$compile', 'uiCalendarConfig', 'OrderService', CalendarCtrl]);
