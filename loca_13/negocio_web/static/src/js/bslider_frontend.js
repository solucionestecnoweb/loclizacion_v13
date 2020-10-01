odoo.define('comercio_web.bcarousel_frontend', function(require) {
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
    sAnimation.registry.bslider_snippet_option = sAnimation.Class.extend({
        selector: ".bslider_snippet_option",
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
            $(".owl-carousel").owlCarousel({
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
				//debugger;
            var e = this,
                i = e.$target.data("slider-limit"),
                a = e.$target.data("collection-id"),
                s = e.$target.data("template"),
				n = 10;
            e.$target.attr("contentEditable", !1), n || (n = 3), i || (i = 3);
            ajax.jsonRpc("/blog/get_blog_content", "call", {
                template: s,
                collection_id: a,
                limit: i
            }).then(function(t) {
                $(t).appendTo(e.$target), e.carousel_view(t)
            }).then(function() {
                e.loading(t)
            }).fail(function(t) {})
        },
        loading: function(t) {}
    });
});