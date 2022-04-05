"use strict";

// Fix and scrlool header
$(function () {
  menu_top = $('.header__main').offset().top;
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > menu_top) {
      if ($('.header__main').css('position') != 'fixed') {
        $('.header__main').css('position', 'fixed');
        $('.header__main').css('top', '0');
        $('.header__main').css('left', '0');
        $('.header__main').css('width', '100%');
        $('.header__main').css('height', '80px');
        $('.header__main').css('z-index', '99');
        $('.header__main').css('background-color', 'rgba(77, 158, 250, 0.5)');
        $('.header__main').css('backdrop-filter', 'blur(2px)');
        $('.about').css('margin-top', '80px');
      }
    } else {
      if ($('.header__main').css('position') == 'fixed') {
        $('.header__main').css('position', '');
        $('.header__main').css('top', '');
        $('.header__main').css('left', '');
        $('.header__main').css('z-index', '');
        $('.header__main').css('background-color', '');
        $('.header__main').css('backdrop-filter', '');
        $('.about').css('margin-top', '');
      }
    }
  }); // hamburger menu

  $(function () {
    $(".hamburger, .page_overlay").on('click', function () {
      $(".hamburger").toggleClass("is-active");
      $("body").toggleClass("open");
    });
  }); // Закрытие меню бургер при нажатии на пунты меню

  $(".sidemenu ul li a").on('click', function () {
    $("body").removeClass("open");
  }); // Плавный Scroll main menu + Скролл по arrow!

  $(".header__item li a, .header__scroll a").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 80;
    $('body,html').animate({
      scrollTop: top + 'px'
    }, 1100);
  });
});