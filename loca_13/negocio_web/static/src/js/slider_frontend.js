odoo.define('comercio_web.carousel_frontend', function(require) {
    "use strict";

    var weContext = require('web_editor.context');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var ajax = require('web.ajax');
    var website = require('website.website');
    var sAnimation = require('website.content.snippets.animation');

    var _t = core._t;
    var qweb = core.qweb;
    var page_widgets = {};
    sAnimation.registry.slider_snippet_option = sAnimation.Class.extend({
        selector: ".slider_snippet_option",
        start: function() {
            this.redraw()
        },
        destroy: function() {
            this.clean(), this._super.apply(this, arguments)
        },
        redraw: function(t) {
            this.clean(t), this.build(t)
        },
        clean: function(t) {
            this.$target.empty()
        },
        carousel_view: function(t) {
            $(".ad_products_slider .product-slider").owlCarousel({
                loop: !0,
                margin: 10,
                responsiveClass: !0,
                dots: !1,
                nav: !0,
                pagination: !1,
                autoplay: !1,
                responsive: {
                    768: {
                        items: 2
                    },
                    979: {
                        items: 2
                    },
                    479: {
                        items: 1
                    },
                    320: {
                        items: 1
                    },
                    1199: {
                        items: this.$target.data("objects_in_slide")
                    }
                }
            })
        },
        build: function(t) {
            var e = this,
                i = e.$target.data("slider-limit"),
                a = e.$target.data("collection-id"),
                n = e.$target.data("objects_in_slide"),
                s = e.$target.data("template");
            e.$target.attr("contentEditable", !1), n || (n = 3), i || (i = 6);
            ajax.jsonRpc("/slider/get_data", "call", {
                template: s,
                collection_id: a,
                objects_in_slide: n,
                limit: i
            }).then(function(t) {
                $(t).appendTo(e.$target);
                
            var tp = e.$target.data("slider-type");

            var sl = false; /* Slider true or false */
            var fw = true; /* Full Width */
            var pd = true; /* Product padding */
            var sp = false; /* Split slide */
            var pn = 5; /* np of product */


        if(tp == "style-2" || tp == "style-3"){
            sp = true;
            pn = 3; 
        } else if(tp == "style-4"){
            sl = true;
        } else if(tp == "style-5"){
            sl = true;
            fw = false;
            pn = 4; 
        } else if(tp == "style-6"){
            fw = false;
            pn = 4; 
        } else if(tp == "style-7"){
            pd = false;
            pn = 4; 
            e.$target.addClass('product-style-2');
        }

        if(fw == false) e.$target.addClass('container');
        if(sl){ 
          e.$target.find('.product-slider').addClass('owl-carousel');          	
          e.carousel_view(t);
          e.$target.removeClass('without-slider');  
        }  else{ 
          e.$target.find('.product-slider').removeClass('owl-carousel');
          e.$target.addClass('without-slider');  
        }
        
        if (sp) { 
            if (tp == "style-2") {
                e.$target.append('<div class="imgblock" data-sticky_column><img class="img-responsive" src="/comercio_web/static/src/img/special/woman-img.jpg" alt="" /></div>');
                e.$target.addClass('split-slider');
                $(".split-slider .imgblock").stick_in_parent();
            } else {
                e.$target.append('<div class="imgblock left-block" data-sticky_column><img class="img-responsive" src="/comercio_web/static/src/img/special/man-img.jpg" alt="" /></div>');
                e.$target.addClass('split-slider split-right');
                $(".split-slider .imgblock").stick_in_parent();
            }
        }

        if (pn != 5) e.$target.addClass('product' + pn);

            }).then(function() {
                e.loading(t)
            }).fail(function(t) {})
        },
        loading: function(t) {}
    });
});