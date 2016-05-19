angular.module('MyApp', [])

.controller('MyCtrl', [function() {
    angular.element(document).ready(function () {
        $('#amount').click(function() {
    $('#amount').css('display', 'none');
	 $('#amount_entry').css('color', 'black');
    $('#amount_entry')
        .val($('#amount').text())
        .css('display', '')
        .focus();
});

$('#amount_entry').blur(function() {
    $('#amount_entry').css('display', 'none');
	
    $('#amount')
        .text($('#amount_entry').val())
        .css('display', '');
});

$('#item').click(function() {
    $('#item').css('display', 'none');
	 $('#item-display').css('color', 'black');
    $('#item-display')
        .val($('#item').text())
        .css('display', '')
        .focus();
});

$('#item-display').blur(function() {
    $('#item-display').css('display', 'none');
	
    $('#item')
        .text($('#item-display').val())
        .css('display', '');
});




    });
}]);