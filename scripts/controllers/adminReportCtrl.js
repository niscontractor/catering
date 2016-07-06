'use strict';

function reportCtrl($http,SweetAlert,$scope, $rootScope, $state, $localStorage,$modal,Excel,$timeout) {


    var customizedDate = function(data){
        for(var i=0; i<data.length; i++){
                var d = new Date($scope.orders[i].created_at),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear(),
                de = new Date($scope.orders[i].eventDate),
                monthE = '' + (de.getMonth() + 1),
                dayE = '' + de.getDate(),
                yearE = de.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                if (monthE.length < 2) monthE = '0' + monthE;
                if (dayE.length < 2) dayE = '0' + dayE;

                $scope.orders[i].created_at = [day, month, year].join('/');
                $scope.orders[i].eventDate = [dayE, monthE, yearE].join('/');
            }
    }

    $scope.AllCaterersDetail = true;
    $scope.catererDetails = false;

    $http.get($rootScope.baseUrl + '/api/adminCatererList')
            .success(function(response){
                console.log(response);
                $scope.caterers = response;
            })
            .error(function(error){
                console.log(error);
            });

    
    $scope.excelButton = true;
    $scope.pdfButton = true;
    $scope.dataFound = true;
    $scope.dataNotFound = false;


    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    } 


    function expertFromHTML() {
            var pdf = new jsPDF('p', 'pt', [800, 700]), source = ""
                    , specialElementHandlers = {
                        '#bypassme': function (element, renderer) {
                            console.log(element);
                            return true;
                        }
                    },
            margins = {top: 40, bottom: 60, left: 15, width: 800};

            source = "<h1>Orders</h1>" +
                    "<table><tr><td>Sr. No</td><td>Email</td><td>Name</td><td>Mobile</td><td>Order</td><td>Amount</td></tr>";
            var comps = $scope.caterers;
            var fields = ["Sr. No", "Email", "Name", "Mobile", "Total Order", "Total Amount"];
            for (var i = 0; i < comps.length; i++)
            {
                source += "<tr>";
                for (var j = 0; j < fields.length; j++)
                {
                    	if (fields[j]=="Sr. No") {
                            source += "<td>" + (i+parseInt(1))+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "</td>";
                        }
                        else if (fields[j]=="Email") {
                            source += "<td>" +comps[i].email + "</td>";
                        }
                        else if (fields[j]=="Name") {
                            source += "<td>" +comps[i].name + "</td>";
                        }
                        else if (fields[j]=="Mobile") {
                            source += "<td>" +comps[i].mobile + "</td>";
                        }
                        else if (fields[j]=="Total Order") {
                            source += "<td>" +comps[i].totalOrders + "</td>";
                        }
                        else {
                            source += "<td>" +comps[i].totalAmount + "</td>";
                        }
                }
                source += "</tr>";
            }
            source += "</table>";

            pdf.fromHTML(
                    source
                    , margins.left, margins.top
                    , {
                        'width': margins.width
                        , 'elementHandlers': specialElementHandlers
                    },
            function (dispose) {
                pdf.save('companies.pdf');
            },
                    margins
                    );
        }

        $scope.getPDF = function () {
            expertFromHTML();
        }


    $scope.fromToDateOrder = function(){
        
    	if ($scope.startDate==undefined || $scope.endDate=='') {
    		SweetAlert.swal('Select Start Date');
    		return;
    	}
    	if ($scope.startDate==undefined || $scope.endDate=='') {
    		SweetAlert.swal('Select End Date');
    		return;
    	}

        var catererId = $scope.caterers[$scope.selectedIndex].id;
        var role = 2;
    	var startDate = $scope.startDate;
    	var endDate = $scope.endDate;
    	startDate = startDate.replace("/", "-");
    	endDate = endDate.replace("/", "-");
    	startDate = startDate.replace("/", "-",-1);
    	endDate = endDate.replace("/", "-");

        $http.get($rootScope.baseUrl + '/api/orders/'+catererId+'/'+role+'/'+startDate+'/'+endDate)
            .success(function(data){
                console.log(data);
                if (data.success=="false") {
                    SweetAlert.swal('No data found');
                    $scope.excelButton = false;
                    $scope.pdfButton = false;
                    $scope.ordersInfo = {};
                }
                else {
                    $scope.ordersInfo = data;
                    $scope.excelButton = true;
                    $scope.pdfButton = true;
                    for(var i=0; i<data.length; i++){
                    var d = new Date($scope.ordersInfo[i].created_at),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    $scope.ordersInfo[i].created_at = [day, month, year].join('/');
                    }
                }
            })
            .error(function(error){
                console.log(error);
            });
    	
    }



    $scope.ShowDetails = function(index){
        $scope.AllCaterersDetail = false;
        $scope.catererDetails = true;
        $scope.showDatePicker = true;
        $scope.showFindButton = true;
        $scope.excelButton = false;
        $scope.pdfButton = false;
        $scope.selectedIndex = index;
        var catererId = $scope.caterers[index].id;
        var role = 2;

        var startDate = $scope.startDate;
        var endDate = $scope.endDate;
        if (startDate==undefined) {
            startDate="null";
        }
        if (endDate==undefined) {
            endDate="null";
        }

        $http.get($rootScope.baseUrl + '/api/adminCatererDetails/'+catererId)
            .success(function(response){
                console.log(response);
                $scope.companyInfo = response;

            })
            .error(function(error){
                console.log(error);
            });

        $http.get($rootScope.baseUrl + '/api/orders/'+catererId+'/'+role+'/'+startDate+'/'+endDate)
            .success(function(data){
                $scope.ordersInfo = data;

                for(var i=0; i<data.length; i++){
                var d = new Date($scope.ordersInfo[i].created_at),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                $scope.ordersInfo[i].created_at = [day, month, year].join('/');
            }
            })
            .error(function(error){
                console.log(error);
            });
    }



}


angular
        .module('urbanApp')
        .controller('adminReportCtrl', ['$http','SweetAlert','$scope', '$rootScope', '$state', '$localStorage','$modal','Excel','$timeout', reportCtrl])
        .factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    });
  