"use strict";

$(function () {
  // Fix Header Scroll
  // $(window).on('scroll', function(){
  // if($(window).scrollTop()>$(".main").height()){
  // вариант ниже с высотой а выше с классом
  //         if($(window).scrollTop()>0){
  //             if(!$("header").hasClass("fixed_header")) {
  //                 $("header").addClass("fixed_header");
  //             }
  //     }else{
  //             if($("header").hasClass("fixed_header")){
  //                 $("header").removeClass("fixed_header");
  //             }
  //         }
  // });
  // Плавный скролл по меню!
  // $("#main_menu a").on('click', function(e){
  //     e.preventDefault();
  //     const top = $($(this).attr("href")).offset().top-60;
  //     $("html, body").animate({scrollTop:top+'px'}, 900);
  // });
  // Hamburger-menu
  $(".hamburger, .page_overlay").on('click', function () {
    // $(".hamburger").toggleClass("is-active");
    $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  }); // Закрытие меню бургер при нажатии на пунты меню

  $(".sidemenu ul li a").on('click', function () {
    $("body").removeClass("open");
  });
});