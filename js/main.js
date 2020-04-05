document.onreadystatechange = function () {
    var state = document.readyState;
    console.log(state);
    if (state == 'complete') {
        $('#load').addClass('hidden');
        $('.main-content').removeClass('hidden');
    }
};
$(document).ready(function(){
    'use strict';

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
            $('.fas.fa-star').removeClass('active');
        }
    });

    $('.tab-pills .title-text').on('click', function(){
        $('.tab-pills .title-text').removeClass('active');
        $(this).addClass('active');
        var activeClass = $(this).data('active-class');
        $('.tab-pill-container').addClass('hidden');
        $('.'+activeClass).removeClass('hidden').addClass('active');
    });

    $('.options').on('click', function(){
        $( '.options-container').fadeIn( "slow", function() {
            $('body').addClass('modal-open');
        });
    });

    $('.help-feedback').on('click', function(){
        $( '.options-container-1').fadeIn( "slow", function() {
            $('body').addClass('modal-open');
        });
    });

    $('.cancel-option').on('click', function(){
        checkModalOpen();
    });

    $('.add-country-btn').on('click', function(){
        $('.settings-start').addClass('hidden');
        $('.add-country-start').removeClass('hidden');
        $('.settings-add-country-start').addClass('hidden');
        $('.settings-add-country').removeClass('hidden');
        $('.settings-start-container').addClass('hidden');
        $('.settings-add-country-choices').removeClass('hidden');
        $('.settings-back-btn').removeClass('visibility-hidden');
    });

    $('.icon-heart').on('click',function () {
        $(this).addClass('hidden');
        $(this).parent().find('.icon-heart-filled').removeClass('hidden');
    });

    $('.icon-heart-filled').on('click',function () {
        $(this).addClass('hidden');
        $(this).parent().find('.icon-heart').removeClass('hidden');
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
