$(document).on('click', '.mega-dropdown-menu', function(e) {
    e.stopPropagation()
})

odoo.define('impacto_megamenu.custom_js', function(require) {
    'use strict';

    $(document).ready(function() {

        if ( $(window).width() < 768) {
            $('.main_category').each(function() {
                var $each_header = $(this).parent().parent().find('li')

                // to close opened menu
                if ( $(this).parent().hasClass('active') == true ){
                    $(this).parent().next('.category_container').addClass('hidden');
                    $(this).parent().removeClass('active');
                    return true
                }
            });
        }

    });
});
