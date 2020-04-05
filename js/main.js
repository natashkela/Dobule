document.onreadystatechange = function () {
    var state = document.readyState;
    console.log(state);
    if (state == 'complete') {
        $('#load').addClass('hidden');
        $('.main-content').removeClass('hidden');
    }
};
var map;
var requestedMarker;
var markers = [];
function hideMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null); //Remove the marker from the map
    }
}
function makeMarker( position, icon, title, listener=false) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title,
        animation: google.maps.Animation.DROP,
    });
    markers.push(marker);
    var addListenerToMarker = function(myMarker){
        marker.addListener('click', function() {
            //What happens on marker click
        });
    }
    if(listener){
        // add a closure for listener manage
        addListenerToMarker(marker);

    }
    map.setCenter(position);
    map.setZoom(15);
    requestedMarker = marker;
}
var markerList = [
    {lat: 42.367785,lng: -71.056631},
    {lat: 42.366743,lng: -71.056713},
    {lat: 42.367235, lng: -71.052861},
    {lat: 42.364444,lng: -71.053076},
    {lat: 42.366854, lng: -71.052303},
    {lat: 42.364183, lng:-71.057517},
    {lat: 42.362816, lng:-71.053816}
];
var homeMarker = {lat:42.367741, lng: -71.054977};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat:42.367741, lng: -71.054977},
        zoom: 15,
        fullscreenControl: false,
    });
    $(window).on('resize', function(){
        google.maps.event.trigger(map, 'resize');
    })
}
$(document).ready(function(){
    'use strict';
    if($('#map').length>0){
        var mapPin = new google.maps.MarkerImage(
            // URL
            './icons/map_pin.svg',
            // (width,height)
            new google.maps.Size( 40, 40 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 0, 6 ),
            //Scaled Size
            new google.maps.Size(40, 40)
        );
        var housePin = new google.maps.MarkerImage(
            // URL
            './icons/map_pin_home.svg',
            // (width,height)
            new google.maps.Size( 60, 60 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 0, 6 ),
            //Scaled Size
            new google.maps.Size(60, 60)
        );
    }

    if($('.view-on-map').length > 0){
        setTimeout(function(){
            for(var i=0;i<markerList.length;i++){
                makeMarker(markerList[i],mapPin, 'Map Pin', true);
            }
            makeMarker(homeMarker, housePin, 'House Pin', true);
        }, 1000);
    }

    $('.delivery-option-left, .delivery-option-right').on('mouseover', function(){
        $(this).find('.delivery-option-light').removeClass('hidden');
    });

    $('.delivery-option-left, .delivery-option-right').on('mouseout', function(){
        $(this).find('.delivery-option-light').addClass('hidden');
    });

    var options3 = {
        autoPlay:true,
        autoPlayInterval:2000,
        itemsMobile : [600,3]
    };

    $('#top-categories-carousel .item').on('mouseover', function(){
        var hiddenEl = $(this).find('.main-pic.hidden');
        if(hiddenEl.hasClass('colored')) {
            hiddenEl.removeClass('hidden');
            $(this).find('.main-pic.dark').addClass('hidden');
        }
    });

    $('#top-categories-carousel .item').on('mouseout', function(){
        var darkEl = $(this).find('.main-pic.dark');
        var coloredEl = $(this).find('.main-pic.colored');
        if(!coloredEl.hasClass('active')) {
            darkEl.removeClass('hidden');
            coloredEl.addClass('hidden');
        }
    });

    if($("#top-categories-carousel").length > 0) {
        $("#top-categories-carousel").owlCarousel(options3);
    }

    var options2 = {
        autoPlay:true,
        autoPlayInterval:2000,
        itemsMobile : [600,2]
    };

    var options1 = {
        autoPlay:true,
        autoPlayInterval:2000,
        itemsMobile : [600,1]
    };

    if($("#top-rated-carousel").length > 0) {
        $("#top-rated-carousel").owlCarousel(options2);
    }

    if($("#local-favorites-carousel").length > 0) {
        $("#local-favorites-carousel").owlCarousel(options2);
    }

    if($("#foodoor-deals-carousel").length > 0) {
        $("#foodoor-deals-carousel").owlCarousel(options1);
    }

    if($("#best-sellers-carousel").length > 0) {
        $("#best-sellers-carousel").owlCarousel(options1);
    }

    if($("#buttons-slider").length > 0) {
        $("#buttons-slider").owlCarousel({
            autoPlay:true,
            autoPlayInterval:2000,
            itemsMobile : [600,4]
        });
    }

    $('.bottom-menu a').on('mouseover',function(){
        var hiddenEl = $(this).find('.menu-pic.hidden');
        if(hiddenEl.hasClass('colored')) {
            hiddenEl.removeClass('hidden');
            $(this).find('.menu-pic.dark').addClass('hidden');
        }
    });

    $('.bottom-menu a').on('mouseout',function(){
        var darkEl = $(this).find('.menu-pic.dark');
        var coloredEl = $(this).find('.menu-pic.colored');
       if(!coloredEl.hasClass('active')) {
           darkEl.removeClass('hidden');
           coloredEl.addClass('hidden');
       }
    });

    $('.password-visibility').on('click', function() {
        var inputelement = $(this).closest('.input-group').find('input');
        if (inputelement.attr('type') == 'text') {
            inputelement.attr('type', 'password');
        } else {
            inputelement.attr('type', 'text');
        }
    });

    $('.fas.fa-star').on('mouseover', function(){
        var index = $(this).index();
        $(this).parent().find('.fas.fa-star').removeClass('active');
        for(var i=0;i<=index;i++){
            var star = $(this).parent().find('.fas.fa-star')[i];
            $(star).addClass('active');
        }
    });

    var starAmount = 0;
    $('.fas.fa-star').on('click', function(){
        var index = $(this).index();
        $(this).parent().find('.fas.fa-star').removeClass('active');
        starAmount = index+1;
        for(var i=0;i<=index;i++){
            var star = $(this).parent().find('.fas.fa-star')[i];
            $(star).addClass('active');
        }
    });

    $('.rating').on('mouseout', function(){
        $(this).find('.fas.fa-star').removeClass('active');
        if(starAmount>0){
            for(var i=0;i<starAmount;i++){
                var star = $(this).find('.fas.fa-star')[i];
                $(star).addClass('active');
            }
        }
        else{
            $(this).find('.fas.fa-star').removeClass('active');
        }
    });

    $('.price-counter .minus').on('click', function(){
        var itemPrice = $(this).closest('.price-counter').find('.value');
        var itemQuantity = $(this).closest('.price-counter').find('.quantity');
        var qty = itemQuantity.text();
        var price = $(this).closest('.price-counter').find('.value').data('price');
        if(qty > 0){
            itemQuantity.text(parseInt(qty)-1);
        }
        else{
            itemQuantity.text(0);
        }
        itemPrice.text(countPriceForItem(itemQuantity.text(), price));

    });

    $('.price-counter .plus').on('click', function(){
        var itemPrice = $(this).closest('.price-counter').find('.value');
        var itemQuantity = $(this).closest('.price-counter').find('.quantity');
        var qty = itemQuantity.text();
        var price = $(this).closest('.price-counter').find('.value').data('price');
        if(qty < 100){
            itemQuantity.text(parseInt(qty)+1);
        }
        else{
            itemQuantity.text(0);
        }
        itemPrice.text(countPriceForItem(itemQuantity.text(), price));
    });

    function countPriceForItem(quantity, itemPrice){
        return (quantity*itemPrice).toFixed(2);
    }

    $('.cancel-option').on('click', function(){
        checkModalOpen();
    });

    function checkModalOpen(){
        if($('body.modal-open').length>0){
            $('.options-container').fadeOut('slow', function(){
                $('body').removeClass('modal-open');
            });
            $('.options-container-1').fadeOut('slow', function(){
                $('body').removeClass('modal-open');
            });
        }
    }

    $('.menu-open').on('click',function(){
        var main_menu = $('.main-menu');
        main_menu.toggleClass('hidden-soft');
        $(this).toggleClass('closed');
        if($(this).hasClass('closed')) {
            main_menu.css('display','block').animate({
                width: "toggle"
            }, 300);
        }
        else {
            main_menu.css('display','block').hide().animate({
                width: "toggle"
            }, 300);
        }
        $('.loading-overlay').css('visibility','visible');
    });

    $('.menu-close').on('click', function(){
        var main_menu = $('.main-menu');
        main_menu.hide().css('display','block').animate({
            width: "toggle"
        }, 300);
        $('.menu-open').addClass('closed');
        $('.loading-overlay').css('visibility','hidden');
    });


});
