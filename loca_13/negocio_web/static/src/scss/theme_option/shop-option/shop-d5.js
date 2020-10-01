$(window).load(function () {
  $('#ad-carousel-product').addClass('owl-carousel');
     $('#ad-carousel-product').owlCarousel({
      items:1, 
      margin:0,
      dots: true
    });
    
    //$("#product_detail").attr("data-sticky_parent",'');
    //$("#product_detail #product_details").attr("data-sticky_column",'');
    //$("#product_detail #product_details").stick_in_parent();

});

