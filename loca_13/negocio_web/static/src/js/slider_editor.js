odoo.define('comercio_web.slider_editor', function(require) {
    "use strict";

    var rpc = require('web.rpc');
    var options = require('web_editor.snippets.options');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var website_sale_utils = require('website_sale.utils');
    var sAnimation = require('website.content.snippets.animation');

    var qweb = core.qweb;
    var _t = core._t;
	ajax.loadXML('/comercio_web/static/src/xml/product_template.xml', core.qweb);
	options.registry.slider_snippet_option_modify = options.Class.extend({
		modify: function(type,value) {
			var self = this;
			if(type == 'reset'){
				self.$modal = $(qweb.render("comercio_web.product_slider_popup"));
				self.$modal.appendTo('body');
				self.$modal.modal();	
				var $collection_opt =self.$modal.find("#productcollection");
				var $slider_type = self.$modal.find("input[name='slidertype']");
				var $limit =self.$modal.find("#limit");
				var $price =self.$modal.find("#chkPrice");
				var $chkRatings =self.$modal.find("#chkRatings");
				var $chkAddtocart =self.$modal.find("#chkAddtocart");
				var $chkWishlist = self.$modal.find("#chkWishlist");
				var $chkQuickView = self.$modal.find("#chkQuickView");
				var $chkRibbon = self.$modal.find("#chkRibbon");
				var $ProductPerSlide = self.$modal.find("#ProductPerSlide");
				var $submit = self.$modal.find("#submit");
				rpc.query({
					model: "website.filter",
					method: "search_read",
					args: [
						[
							["Is_published", "=", !0],
							["collection_id.model_id", "=", "product.template"]
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
						
						var ProductPerSlide = self.$target.attr("data-product-per-slide");
						$ProductPerSlide.val(ProductPerSlide);
						
						var slidertype= self.$target.attr("data-slider-type");
						
						var limit =  self.$target.attr("data-slider-limit");
						$limit.val(limit);
						
						//alert(self.$target.attr("data-slider-price"));
						var price = self.$target.attr("data-slider-price");
						
						if(price == 1)
						{
							$price.attr("checked","checked");
						}
						
						var Ratings =self.$target.attr("data-slider-rating");
						if(Ratings == 1)
						{
							$chkRatings.attr("checked","checked");
						}
						
						var AddToCart =self.$target.attr("data-slider-addtocart");
						if(AddToCart == 1)
						{
							$chkAddtocart.attr("checked","checked");
						}
						
						var wish = self.$target.attr("data-slider-wish");
						if(wish == 1)
						{
							$chkWishlist.attr("checked","checked");
						}
						
						var QuickView = self.$target.attr("data-slider-quick");
						if(QuickView == 1)
						{
							$chkQuickView.attr("checked","checked");
						}
						
						var Ribbon = self.$target.attr("data-slider-ribbon");
						if(Ribbon == 1)
						{
							$chkRibbon.attr("checked","checked");
						}
                    });			
				});
				
				$submit.on('click', function() {
                      self.$target.attr("data-collection-id", $collection_opt.val());
                      var val = self.$modal.find("input[name='slidertype']:checked").val();
                      self.$target.attr("data-slider-type", val);
					  self.$target.attr("data-slider-limit", $limit.val());
					  self.$target.attr("data-product-per-slide", $ProductPerSlide.val()); 
					  //alert($price.attr("checked","checked").length);
					  if($price.prop('checked') == true)
					  {
							self.$target.attr("data-slider-price",1);
					  }
					  else
					  {
					  
							self.$target.attr("data-slider-price",0);
					  }
					  if($chkRatings.prop('checked') == true)
					  {
							self.$target.attr("data-slider-rating",1);
					  }
					  else
					  {
							self.$target.attr("data-slider-rating",0);
					  } 
					  if($chkAddtocart.prop('checked') == true)
					  {
							self.$target.attr("data-slider-addtocart",1);
					  }
					  else
					  {
							self.$target.attr("data-slider-addtocart",0);
					  }
					  
					  if($chkWishlist.prop('checked') == true)
					  {
						  self.$target.attr("data-slider-wish",1);
					  }
					  else
					  {
						  self.$target.attr("data-slider-wish",0);
					  }
					  if($chkQuickView.prop('checked') == true)
					  {
						  self.$target.attr("data-slider-quick",1);
					  }
					  else
					  {
						  self.$target.attr("data-slider-quick",0);
					  }
					  
					  //alert($chkRibbon.attr("checked","checked").length);
					  if($chkRibbon.prop('checked') == true)
					  {
						  alert("hi");
						  self.$target.attr("data-slider-ribbon",1);
					  }
					  else
					  {
						  //alert("hi");
						  self.$target.attr("data-slider-ribbon",0);
					  }
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
    }),sAnimation.registry.slider_snippet_option.include({
		 events: {
            "click .o_add_wishlist": "wishClick"
        },
        init: function() {
            this._super.apply(this, arguments), this.wishlist_product_ids = []
        },
        wishClick: function(t) {
            var i = this;
            $.get("/shop/wishlist", {
                count: 1
            }).then(function(t) {
                i.wishlist_product_ids = JSON.parse(t)
            }), this.addToWisbList($(t.target).parent(), t)
        },
        addToWisbList: function(t, i) {
            var e = this,
                s = void 0 === $(i.target).data("product-product-id") ? t.data("product-product-id") : $(i.target).data("product-product-id");
            if (i.currentTarget.classList.contains("o_add_wishlist_dyn") && (s = parseInt(t.parent().find(".product_id").val())), !_.contains(e.wishlist_product_ids, s)) return ajax.jsonRpc("/shop/wishlist/add", "call", {
                product_id: s
            }).then(function() {
                e.wishlist_product_ids.push(s), website_sale_utils.animate_clone($("#my_wish"), t.closest("form"), 25, 40), t.prop("disabled", !0).addClass("disabled"), $("#my_wish").show(), $(".my_wish_quantity").text(e.wishlist_product_ids.length)
            })
        }
	});
});