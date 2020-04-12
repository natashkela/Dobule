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
var directionsDisplayMap;
var directionsServiceMap;
var markers = [];
function hideMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null); //Remove the marker from the map
    }
}
function makeMarker( position, icon, title, listener=false, dialog={}) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title,
        animation: google.maps.Animation.DROP,
    });
    markers.push(marker);
    var addListenerToMarker = function(myMarker){
        //@TODO - Sabrina's picture should be changed, it looks bad
        var dialog1 = '<div class="dialog2">'+
            '<div class="absolute-container">'+
            '<div class="image"><img src="./img/sabrina_map.svg" alt="Sabrina Image"></div>'+
            '<div class="d-flex justify-content-between margin-top-5">\n' +
            '<div class="text"><div class="title">Sabrina Lorenstein</div>' +
            '<div class="address intro-text m-0 font-10">02113; 65 Summer Str.</div>' +
            '<div class="address intro-text m-0 font-10">Boston, MA</div>' +
            '</div>' +
            '</div>'+
            '</div>';

        var infowindow1 = new google.maps.InfoWindow({
            content: dialog1
        });

        var dialog2 = '<div class="dialog1">'+
                '<div class="absolute-container">'+
                '<div class="image"><img src="./img/foodoor_deals_1.jpg" alt="Lecasa Image"></div>'+
                '<div class="d-flex justify-content-between margin-top-5 text-wrapper">\n' +
            '<div class="text"><div class="title">Le Casa</div><div class="address intro-text font-10">02113; 23 Salem Str. Boston, MA</div></div>' +
        '<div class="review-container d-flex align-items-center">\n' +
                '<div class="rating">\n' +
                '    <span class="fas fa-star active"></span>\n' +
                '    <span class="fas fa-star active"></span>\n' +
                '    <span class="fas fa-star active"></span>\n' +
                '    <span class="fas fa-star active"></span>\n' +
                '    <span class="fas fa-star active"></span>\n' +
                '    </div>\n' +
                '    <span class="intro-text d-flex flex-column justify-content-center font-10 margin-left-10 mt-0">4.9 (2902 ratings)</span>\n' +
                '</div>' +
            '</div>'+
            '</div>'+
            '</div>';

        var infowindow2 = new google.maps.InfoWindow({
            content: dialog2
        });

        marker.addListener('click', function(e) {
            if(dialog.hasOwnProperty('dialog')) {
                if(dialog.dialog == 1){
                    infowindow1.open(map, marker);
                }
                else if(dialog.dialog == 2){
                    infowindow2.open(map, marker);
                }
            }
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
var homeMarker = {lat:42.367382, lng: -71.055033};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat:42.367741, lng: -71.054977},
        zoom: 15,
        fullscreenControl: false,
        styles:[
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "gamma": "1"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "weight": "6.61"
                    },
                    {
                        "lightness": "0"
                    },
                    {
                        "gamma": "1.5"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "gamma": "1.5"
                    },
                    {
                        "weight": "0.01"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e3e3e3"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-3"
                    },
                    {
                        "color": "#e2e2e2"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#8d8d8d"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#315797"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9f9f9f"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#9f9f9f"
                    }
                ]
            }
        ]
    });
    $(window).on('resize', function(){
        google.maps.event.trigger(map, 'resize');
    })
}
function multipleRoute(directionsService, directionsDisplay){
    directionsDisplayMap = new google.maps.DirectionsRenderer({suppressMarkers:true});
    directionsDisplayMap.setOptions({
        polylineOptions: {
            strokeColor: '#315797',
            strokeWeight: 5,
            strokeOpacity:0
        }
    });
    directionsDisplayMap.setMap(map);
    directionsServiceMap = directionsService;
    var waypts = [{
        location:"2 Staniford Street, Boston, MA",
        stopover:true
    }]
    var coordinates = [{lat:42.359236,lng: -71.059393}];
    var icons = {
        marker: new google.maps.MarkerImage(
            // URL
            './icons/bike_pin.svg',
            // (width,height)
            new google.maps.Size(50, 50),
            // The origin point (x,y)
            new google.maps.Point(0, 0),
            // The anchor point (x,y)
            new google.maps.Point(20, 20),
            // new google.maps.Size(28, 72)
        ),
        eat: new google.maps.MarkerImage(
            // URL
            './icons/pin_eat.svg',
            // (width,height)
            new google.maps.Size(70, 70),
            // The origin point (x,y)
            new google.maps.Point(0, 0),
            // The anchor point (x,y)
            new google.maps.Point(35, 35),
            new google.maps.Size(70, 70)
        ),

    };
    directionsService.route({
        origin: "100 City Hall Plaza, Boston, MA",
        destination: "71 Charter Street, Boston, MA",
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        console.log(response);
        console.log(status);
        if (status === 'OK') {
            directionsDisplayMap.setDirections(response);
            renderDirectionsPolylines(response, map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    makeMarker({lat:42.361290, lng:-71.063766}, icons.eat, "Route End", true, {dialog:1});
    for(var i=0;i<coordinates.length;i++){
        makeMarker(coordinates[i], icons.marker,"Route Stop");
    }
}
function multipleRouteHide(){
    initMap();
}
function hideMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null); //Remove the marker from the map
    }
}
function renderDirectionsPolylines(response,map){
    var bounds = new google.maps.LatLngBounds();
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
    };
    var polylineOptions = [{
        icons: [{
            "icon": {
                "path": 0,
                "scale": 1,
                "fillOpacity": 0.7,
                "fillColor": "#D63229",
                "strokeOpacity": 0.8,
                "strokeColor": "#D63229",
                "strokeWeight": 3
            },
            "repeat": "10px"
        }],
        strokeColor: "#000000",
        strokeOpacity: 0,
        strokeWeight: 5
    },{
        strokeColor: '#315797',
        strokeWeight: 5
    }];
    var legs = response.routes[0].legs;
    for (i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        for (j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            var stepPolyline = new google.maps.Polyline(i>0 ? polylineOptions[1] : polylineOptions[0]) ;
            for (k = 0; k < nextSegment.length; k++) {
                stepPolyline.getPath().push(nextSegment[k]);
                bounds.extend(nextSegment[k]);
            }
            stepPolyline.setMap(map);
        }
    }
    // map.fitBounds(bounds);
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
            new google.maps.Point( 30, 30 ),
            //Scaled Size
            new google.maps.Size(60, 60)
        );
    }

    if($('.view-on-map').length > 0){
        setTimeout(function(){
            for(var i=0;i<markerList.length;i++){
                makeMarker(markerList[i],mapPin, 'Map Pin');
            }
            makeMarker(homeMarker, housePin, 'House Pin', true, {dialog:1});
        }, 1000);
    }

    function initReachMapDestination(){
        setTimeout(function(){
            makeMarker(homeMarker, housePin, 'House Pin', true, {dialog:2});
        }, 0);
        multipleRoute(new google.maps.DirectionsService, new google.maps.DirectionsRenderer);
    }

    $('.open_shipper .slider').on('click', function(){
        if($(this).parent().find('input').is(':checked')){
            hideMarkers();
            multipleRouteHide();
        }
        else{
            initReachMapDestination();
        }
        $('.shipper').toggleClass('hidden');
    });


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

    $('.menu-icon').add('.main-menu .close-icon').on('click', function(){
       $('.page-content').toggleClass('hidden');
       $('.main-menu').toggleClass('hidden');
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

    $('.intro-info .arrow').on('click', function(){
       $(this).find('img').toggleClass('hidden');
       $('.shipper').toggleClass('full-height');
       $('.info-container').toggleClass('hidden');
    });


});
