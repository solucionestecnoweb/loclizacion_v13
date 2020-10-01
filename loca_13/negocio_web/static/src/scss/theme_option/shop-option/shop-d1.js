$(window).load(function () {
  $('#ad-carousel-product').addClass('owl-carousel');
     $('#ad-carousel-product').owlCarousel({
      items:1, 
      margin:0,
      thumbs: true,
      thumbImage: true,
      thumbContainerClass: 'owl-thumbs',
      thumbItemClass: 'owl-thumb-item'
    });
    
    //$("#product_detail").attr("data-sticky_parent",'');
    //$("#product_detail #product_details").attr("data-sticky_column",'');
    //$("#product_detail #product_details").stick_in_parent();

});