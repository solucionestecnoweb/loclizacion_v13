odoo.define('comercio_web.bslider_editor', function(require) {
    "use strict";

    var rpc = require('web.rpc');
    var options = require('web_editor.snippets.options');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var website_sale_utils = require('website_sale.utils');
    var sAnimation = require('website.content.snippets.animation');

    var qweb = core.qweb;
    var _t = core._t;
	ajax.loadXML('/comercio_web/static/src/xml/blog_template.xml', core.qweb);
	options.registry.bslider_snippet_option_modify = options.Class.extend({
		modify: function(type,value) {
			var self = this;
			if(type == 'reset'){
				self.$modal = $(qweb.render("comercio_web.blog_slider_popup"));
				self.$modal.appendTo('body');
				self.$modal.modal();	
				var $collection_opt =self.$modal.find("#productcollection");
				
				var $limit =self.$modal.find("#limit");
				
				var $submit = self.$modal.find("#submit");
				rpc.query({
					model: "website.filter",
					method: "search_read",
					args: [
						[
							["Is_published", "=", !0],
							["collection_id.model_id", "=", "blog.post"]
						],
						["name", "collection_id", "id"]
					]
				}).then(function(i) {	
					$collection_opt.find("#option").remove();
					$(i).each(function() {
						var t = $(this);
                        $collection_opt.append('<option value="' + t[0].id + '">' + t[0].name + '</option>');  	
						
						var collection_id = self.$target.attr("data-collection-id");
						$collection_opt.val(collection_id);
						
						var slidertype= self.$target.attr("data-slider-type");
						
						var limit =  self.$target.attr("data-slider-limit");
						$limit.val(limit);
						
						
                    });			
				});
				
				$submit.on('click', function() {
                      self.$target.attr("data-collection-id", $collection_opt.val());
                      
					  self.$target.attr("data-slider-limit", $limit.val());
					 
                });
			}         
            return    
        },
        onBuilt: function() {
            var self = this;
        },
        cleanForSave: function() {
            //this._super.apply(this, arguments), 
			this.$target.empty();
        }
    });
});