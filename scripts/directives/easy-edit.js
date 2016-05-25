angular.module('MyApp', [])

.controller('MyCtrl', [function() {
    angular.element(document).ready(function () {
        
$('.amount-title').click(function() {
    $(this.id).css('display', 'none');
    $(this.id+'_entry').css('color', 'black');
    $(this.id+'_entry')
        .val($(this.id).text())
        .css('display', '')
        .focus();
});

$('.amount-title-entry').blur(function() {
    $(this.id).css('display', 'none');	
    var id = this.id.replace('-entry','');
    $(id)
        .text($(this.id).val())
        .css('display', '');
});

$('.item-title').click(function() {
    $(this.id).css('display', 'none');
    $(this.id+'-display').css('color', 'black');
    $(this.id+'-display')
        .val($(this.id).text())
        .css('display', '')
        .focus();
});

$('.item-title-display').blur(function() {
    $(this.id).css('display', 'none');
    var id = this.id.replace('-display','');
    $(id)
        .text($(this.id).val())
        .css('display', '');
});




    });
}]);