$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 1000,
      step: 10,
      values: [ 100, 500 ],
      slide: function( event, ui ) {
        $( "#amount-start" ).val(ui.values[ 0 ] + "₽");
        $( "#amount-end" ).val(ui.values[ 1 ] + "₽");
      }
    });
    $( "#amount-start" ).val( $( "#slider-range" ).slider( "values", 0 ) + 
      "₽");
    $( "#amount-end" ).val( $( "#slider-range" ).slider( "values", 1 ) + 
      "₽");
  } );

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop:false,
    items:1,
    dots: true,
    nav:true
  });
});