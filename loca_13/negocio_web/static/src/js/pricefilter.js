
odoo.define('comercio_web.filter', function(require) {
    "use strict";
    require('web.dom_ready');
   
	if ($("#minprice").val() && $("#minprice").val() == "") {
        $("#minprice").val('0')
    }
    var slider_min = $("#min_listPrice").val();;
    var sldier_max = $("#max_listPrice").val();;
    var price_from = $("#minprice").val();
    if (price_from == "") {
        price_from = slider_min;
    }
    var price_to = $("#maxprice").val();
    if (price_to == "") {
        price_to = sldier_max;
    }
    $("#range").ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: slider_min,
        max: sldier_max,
        from: price_from,
        to: price_to,
        type: 'double',
        step: 1,
        grid: false,
        onChange: function(data) {
            $("#minprice").val(data.from)
            $("#maxprice").val(data.to)
        },
    });
    $("#minprice").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $("#maxprice").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $("#slider_form").click(function() {
        if ($("#minprice").val() == "")
            return false
        else if ($("#maxprice").val() == "")
            return false
        else
            return true
    });
   
});







