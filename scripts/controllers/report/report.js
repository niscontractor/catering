'use strict';

function reportCtrl(ngTranslation,$interval,SweetAlert,$scope, $rootScope, $state, $localStorage,ReportService,$modal,Excel,$timeout) {

    var name = $localStorage.selectedLanguage;
    ngTranslation.use(name);
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

    $interval(function () {
        if ($localStorage.selectedLanguage == 'sp') {
            $scope.months = $scope.monthsSp;
        }
        else {
            $scope.months = $scope.monthsEn;
        }
    }, 1000);

	ReportService.today().then(function(data){
        if (data.success=="false") {
            $scope.orders = [];
        }
        else {
			$scope.orders = data;
            customizedDate(data);
        }
	});

    $scope.months = [];

	$scope.monthsEn = [
      {"key": "null",
       "value": "Select Month"},
      {"key": "1",
      "value": "01 - Jan"},
      {"key": "2",
      "value": "02 - Feb"},
      {"key": "3",
      "value": "03 - Mar"},
      {"key": "4",
      "value": "04 - Apr"},
      {"key": "5",
      "value": "05 - May"},
      {"key": "6",
      "value": "06 - Jun"},
      {"key": "7",
      "value": "07 - Jul"},
      {"key": "8",
      "value": "08 - Aug"},
      {"key": "9",
      "value": "09 - Sep"},
      {"key": "10",
      "value": "10 - Oct"},
      {"key": "11",
      "value": "11 - Nov"},
      {"key": "12",
      "value": "12 - Dec"}
    ];
    $scope.monthsSp = [
      {"key": "null",
       "value": "Seleccione mes"},
      {"key": "1",
      "value": "01 - Ene"},
      {"key": "2",
      "value": "02 - Feb"},
      {"key": "3",
      "value": "03 - Mar"},
      {"key": "4",
      "value": "04 - Abr"},
      {"key": "5",
      "value": "05 - May"},
      {"key": "6",
      "value": "06 - Jun"},
      {"key": "7",
      "value": "07 - Jul"},
      {"key": "8",
      "value": "08 - Ago"},
      {"key": "9",
      "value": "09 - Sep"},
      {"key": "10",
      "value": "10 - Oct"},
      {"key": "11",
      "value": "11 - Nov"},
      {"key": "12",
      "value": "12 - Dic"}
    ];

    if ($localStorage.selectedLanguage=='sp') {
        $scope.months = $scope.monthsSp;
    }
    else {
        $scope.months = $scope.monthsEn;
    }

    $scope.month = 'null';
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
                    "<table><tr><td>Sr. No</td><td>Order No</td><td>Order Date</td><td>Amount</td></tr>";
            var comps = $scope.orders;
            var fields = ["Sr. No", "Order No", "Order Date", "Amount"];
            for (var i = 0; i < comps.length; i++)
            {
                source += "<tr>";
                for (var j = 0; j < fields.length; j++)
                {
                    	if (fields[j]=="Sr. No") {
                        	source += "<td>" + (i+parseInt(1)) + "</td>";
                    	}
                    	else if (fields[j]=="Order No") {
                    		source += "<td>" +comps[i].order_id + "</td>";
                    	}
                    	else if (fields[j]=="Order Date") {
                    		source += "<td>" +comps[i].created_at + "</td>";
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
        console.log($scope.fromDate);
        console.log($scope.toDate);
    	if ($scope.fromDate==undefined || $scope.fromDate=='') {
    		SweetAlert.swal('Select Start Date');
    		return;
    	}
    	if ($scope.toDate==undefined || $scope.toDate=='') {
    		SweetAlert.swal('Select End Date');
    		return;
    	}


    	var fromDate = $scope.fromDate;
    	var toDate = $scope.toDate;
    	fromDate = fromDate.replace("/", "-");
    	toDate = toDate.replace("/", "-");
    	fromDate = fromDate.replace("/", "-",-1);
    	toDate = toDate.replace("/", "-");
    	ReportService.fromToDateOrder(fromDate,toDate).then(function(data){
			$scope.month = 'null';
			console.log(data);
			if (data.success=="false") {
    			$scope.orders = null;
                $scope.excelButton = false;
                $scope.pdfButton = false;
                $scope.dataFound = false;
                $scope.dataNotFound = true;
                if ($localStorage.selectedLanguage=='sp') {
                    SweetAlert.swal('Extraviado!','No se han órdenes encontrado para date seleccionado');
                }
                else {
                    SweetAlert.swal('Not Found!','No orders found for selected date');
                }
    		}
    		else {
				$scope.orders = data;
                $scope.excelButton = true;
                $scope.pdfButton = true;
                $scope.dataFound = true;
                $scope.dataNotFound = false;
				customizedDate(data);	
			}
		})
    }

    $scope.selectedMonth = function(){
        $scope.fromDate = '';
        $scope.toDate = '';
    	ReportService.month($scope.month).then(function(data){
    		if (data.success=="false") {
    			$scope.orders = null;
                $scope.excelButton = false;
                $scope.pdfButton = false;
                $scope.dataFound = false;
                $scope.dataNotFound = true;
                if ($localStorage.selectedLanguage=='sp') {
                    SweetAlert.swal('Extraviado!','No se han órdenes encontrado para el mes seleccionado ');
                }
                else {
                    SweetAlert.swal('Not Found!','No orders found for selected month');
                }
    		}
    		else {
                $scope.dataFound = true;
                $scope.dataNotFound = false;
                $scope.excelButton = true;
                $scope.pdfButton = true;
				$scope.orders = data;
				customizedDate(data);
			}
		})
    }

	$scope.today = function(){
        $scope.fromDate = '';
        $scope.toDate = '';
		ReportService.today().then(function(data){
            if (data.success=="false") {
                $scope.orders = null;
                $scope.excelButton = false;
                $scope.pdfButton = false;
                $scope.dataFound = false;
                $scope.dataNotFound = true;
                SweetAlert.swal('Not Found!','No orders found for today');
            }
            else {    
                $scope.dataFound = true;
                $scope.dataNotFound = false;
                $scope.excelButton = true;
                $scope.pdfButton = true;
    			$scope.orders = data;
    			$scope.month = 'null';
                customizedDate(data);
    			
            }
		})
	}

	$scope.week = function(){
        $scope.fromDate = '';
        $scope.toDate = '';
		ReportService.week().then(function(data){
            if (data.success=="false") {
                $scope.orders = null;
                $scope.excelButton = false;
                $scope.pdfButton = false;
                $scope.dataFound = false;
                $scope.dataNotFound = true;
                SweetAlert.swal('Not Found!','No orders found for this week');
            }
            else {             
                $scope.dataFound = true;
                $scope.dataNotFound = false;   
                $scope.excelButton = true;
                $scope.pdfButton = true;
    			$scope.orders = data;
    			$scope.month = 'null';
    			customizedDate(data);
            }
		})
	}
	$scope.orderModal = function(index){
        
        var modalInstance = $modal.open({
            templateUrl: 'orderInfo.html',
            controller: ('orderInfoEventCtrl', ['$scope', '$modalInstance', '$rootScope','object', orderInfoEventCtrl]),
            resolve: {
                object: function () {
                    return $scope.orders[index];
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
        $scope.e.pdfUrl = object.pdfUrl;
        $scope.e.items = object.item_info;
        console.log(object);

         $scope.closeModal = function(){
            $modalInstance.close();
        }
    }



}


angular
        .module('urbanApp')
        .controller('reportCtrl', ['ngTranslation','$interval','SweetAlert','$scope', '$rootScope', '$state', '$localStorage','ReportService','$modal','Excel','$timeout', reportCtrl])
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
  