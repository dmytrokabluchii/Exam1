"use strict";

$(function () {
  // Fix Header Scroll
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 0) {
      if (!$("header").hasClass("fixed_header")) {
        $("header").addClass("fixed_header");
      }
    } else {
      if ($("header").hasClass("fixed_header")) {
        $("header").removeClass("fixed_header");
      }
    }
  }); // Плавный Scroll main menu + Скролл по arrow!

  $("#header__menu_links li a, .footer__arrow a, .item__service a, .home__arrow_down, .header__logo_symbol, .footer__logo_symbol").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 60; // let id  = $(this).attr('href'), top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top + 'px'
    }, 1100);
  }); // Active menu при scroll

  var sections = $('section'),
      nav = $('.nav__menu'),
      navHeight = nav.outerHeight();
  $(window).on('scroll', function () {
    var curPos = $(this).scrollTop();
    sections.each(function () {
      var top = $(this).offset().top - navHeight,
          bottom = top + $(this).outerHeight();

      if (curPos >= top && curPos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');
        $(this).addClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  });
  nav.find('a').on('click', function () {
    var $el = $(this),
        id = $el.attr('href');
    $('html, body').animate({
      scrollTop: $(id).offset().top - navHeight
    }, 500);
    return false;
  }); // Hamburger-menu

  $(".hamburger, .page_overlay").on('click', function () {
    $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  }); // Закрытие меню бургер при нажатии на пунты меню, кнопку callback и на логотип

  $(".sidemenu ul li a, .mobile__btn, .mobile__logo_symbol").on('click', function () {
    $("body").removeClass("open");
  }); // Модальное окно 
  // открыть по кнопке callback

  $('.callback__btn, .item__service_contact a').click(function () {
    $('.modal__callback').fadeIn();
    $('.modal__callback').addClass('disabled');
  }); // закрыть на крестик callback + order tour

  $('.callback__close_btn, .modal__close_btn').click(function () {
    $('.modal__callback, .booking__modal').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
  }); // закрыть по клику вне окна callback + order tour

  $(document).mouseup(function (e) {
    var popup = $('.callback__content, .modal__content');

    if (e.target != popup[0] && popup.has(e.target).length === 0) {
      $('.modal__callback, .booking__modal').fadeOut(600);
    }
  }); // закрыть по ESC

  $(document).on('keydown', function (event) {
    if (event.keyCode == 27) {
      $('.modal__callback, .booking__modal').fadeOut(600);
    }
  }); // Маска номера телефона для модалок

  $(function () {
    $('#callback_phone, #booking_phone').mask('+38 (099) 999-99-9?9');
  }); // Маска e-mail address для модалки

  $('#booking_email[type=email]').on('blur', function (e) {
    e.preventDefault();
    var email = $(this).val();

    if (email.length > 0 && (email.match(/.+?\@.+/g) || []).length !== 1) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Fill right email address!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }); //  константы для Telegram BOT

  var BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc';
  var CHAT_ID = '704440668'; // Отправка формы callback на Telegram BOT

  $("#my_callback-form").on('submit', function (e) {
    e.preventDefault();
    var nameInputCallback = document.getElementById('callback_name');
    var phoneInputCallback = document.getElementById('callback_phone');
    var textCallback = encodeURI("Name: ".concat(nameInputCallback.value, ", Phone: ").concat(phoneInputCallback.value));

    if (nameInputCallback.value !== '' && phoneInputCallback.value !== '') {
      $.get("https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=") + textCallback + '&parse_mode=html', function (json) {
        if (json.ok) {
          $("#my_callback-form").trigger('reset');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your message send!',
            showConfirmButton: false,
            timer: 3000
          }); // Закрытие формы callback после успешной отправки

          $('.modal__callback').fadeOut(600);
        }
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Fill all field!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }); // Модальное окно order tour

  getCard(); // Отправка формы на Telegram BOT

  $("#my_booking_form").on('submit', function (e) {
    e.preventDefault();
    var nameInput = document.getElementById('booking_name');
    var surnameInput = document.getElementById('booking_surname');
    var emailInput = document.getElementById('booking_email');
    var phoneInput = document.getElementById('booking_phone');
    var tourSelect = document.getElementById('choice_tour');
    var text = encodeURI("Name: ".concat(nameInput.value, ", Surname:").concat(surnameInput.value, ", \n        Email: ").concat(emailInput.value, ", Phone: ").concat(phoneInput.value, ", Tour: ").concat(tourSelect.value));

    if (nameInput.value !== '' && surnameInput.value !== '' && emailInput.value !== '' && phoneInput.value !== '' && tourSelect.value !== '') {
      $.get("https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=") + text + '&parse_mode=html', function (json) {
        if (json.ok) {
          $("#my_booking_form").trigger('reset');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your message send!',
            showConfirmButton: false,
            timer: 3000
          }); // Закрытие формы order tour после успешной отправки

          $('.booking__modal').fadeOut(600);
        }
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Fill all field!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }); // Slick-slider Place

  $('#card_tour').slick({
    infinite: true,
    speed: 900,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [{
      breakpoint: 999,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1 // arrows: false,

      }
    }]
  });
}); // Динамические карты блока place

function getCard() {
  return regeneratorRuntime.async(function getCard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap($.ajax({
            url: 'common/card.json',
            type: 'get',
            dataType: 'json',
            success: function success(json) {
              var html = '';
              json.forEach(function (card) {
                html += "\n                    <li class=\"card__item card-first wow animate__zoomIn\" data-wow-duration=\"2s\">\n                        <div class=\"card__image\" id=\"card-img\">\n                            <a class=\"card__image_link colorbox\" data-fancybox=\"group-1\" \n                            href=\"assets/images/place_image/".concat(card.pic.bigImage, "\" title=\"").concat(card.title, "\">\n                                <img class=\"card__pic\"\n                                    src=\"assets/images/place_image/").concat(card.pic.image, "\" alt=\"place_image\">\n                                <div class=\"card__price\">").concat(card.pic.price, "</div>\n                            </a>\n                        </div>\n                        <div class=\"card__content\">\n                            <div class=\"card__title\">\n                                <h6>").concat(card.title, "</h6>\n                            </div>\n                            <div class=\"card__subtitle subtitle\">\n                                <p>").concat(card.description, "</p>\n                            </div>\n                            <div class=\"card__link\">\n                                <button type=\"button\" class=\"card__link_text text_orange\" id=\"card_btn\">\n                                ").concat(card.link, "</button>\n                            </div>\n                        </div>\n                    </li>\n                ");
              });
              $("#page_card").append(html);
              $("#card_tour").slick('slickAdd', html);
            },
            error: function error() {
              // modal window sweet-aler2
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: "The tour-cards don't load!",
                showConfirmButton: false,
                timer: 4000
              });
            }
          }));

        case 2:
          // открыть по кнопке
          $('#booking_btn, #card_btn').click(function () {
            $('.booking__modal').fadeIn();
            $('.booking__modal').addClass('disabled');
          }); // colorbox plugin

          $(function () {
            $("a.card__image_link").colorbox({
              maxWidth: "98%",
              maxHeight: "98%",
              closeButton: "true"
            });
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
} // Динамические карты блока clients


function getReview() {
  $.ajax({
    url: 'common/review.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';
      json.forEach(function (item) {
        html += "\n                <li class=\"clients__cards\">\n                    <article class=\"clients__content\">\n                        <div class=\"clients__review subtitle\">\n                            <p>".concat(item.review, "\n                            </p>\n                        </div>\n                        <div class=\"clients__item\">\n                            <div class=\"clients__footer\">\n                                <div class=\"clients__avatar\">\n                                    <img class=\"clients__avatar_photo\"\n                                        src=\"assets/images/clients/").concat(item.author.avatar, "\" alt=\"author-pic\">\n                                </div>\n                                <div class=\"clients__info\">\n                                    <div class=\"clients__info_author\">").concat(item.author.name, "</div>\n                                    <div class=\"clients__info_occupation\">").concat(item.author.occupation, "</div>\n                                </div>\n                            </div>\n                        </div>\n                    </article>\n                </li>\n                ");
      });
      $("#review_clients").append(html);
    },
    error: function error() {
      // modal window sweet-aler2
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: "The clients-cards don't load!",
        showConfirmButton: false,
        timer: 4000
      });
    }
  });
}

getReview(); // Подключение lightGallery

lightGallery(document.querySelector('.gallery__album', '.album__page'), {
  plugins: [lgZoom, lgThumbnail],
  thumbnail: true,
  zoom: true,
  actualSize: true,
  animateThumb: true,
  zoomFromOrigin: true,
  speed: 500,
  licenseKey: 'your_license_key'
}); // Map Leaflet
// инициализируем карту по клику

$("#init_map").on('click', function () {
  // удаляем tag <a> init_map
  $(this).remove(); // Инициализация карты

  var map = L.map('my_map').setView([24.9092452, 91.8641862], 4);
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  var myIcon = L.icon({
    iconUrl: 'assets/images/svg/map-pin.svg',
    iconSize: [96, 96],
    iconAnchor: [12, 41],
    popupAnchor: [36, -25]
  });
  var marker = L.marker([24.9092452, 91.8641862], {
    icon: myIcon
  }).addTo(map).bindPopup("\n    <div class=\"map_popup\">\n    <img src=\"assets/plugins/leflet/images/map.svg\" alt=\"map-pic\">\n    <div class=\"map_info\">\n        <b>Hello! <br>\n        My friend!</b>\n        <div class=\"map_info_text\">You're in Flat 20, Housing state, Sylhet!</div>\n        </div>\n    </div>\n    ");
}); // Инициализация WOW.js при скроле for animate.css

new WOW().init();