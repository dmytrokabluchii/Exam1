"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  var _$$slick;

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
  });
  $("#header__menu_links a").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 60;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 1400);
  }); // Скролл по arrow!

  $(".footer__arrow a").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1400);
  }); // Hamburger-menu

  $(".hamburger, .page_overlay").on('click', function () {
    $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  }); // Закрытие меню бургер при нажатии на пунты меню и кнопку callback

  $(".sidemenu ul li a, .mobile__btn").on('click', function () {
    $("body").removeClass("open");
  }); // Модальное окно order tour

  getCard(); // закрыть по клику вне окна

  $(document).mouseup(function (e) {
    var popup = $('.modal__content');

    if (e.target != popup[0] && popup.has(e.target).length === 0) {
      $('.booking__modal').fadeOut(600);
    }
  }); // закрыть по ESC

  $(document).on('keydown', function (event) {
    if (event.keyCode == 27) {
      $('.booking__modal').fadeOut(600);
    }
  }); // Маска номера телефона

  $(function () {
    $('#booking_phone').mask('+38 (099) 999-99-9?9');
  }); // Валидация + отправка формы на Telegram BOT

  $("#my_booking-form").on('submit', function (e) {
    e.preventDefault();
    var nameInput = document.getElementById('booking_name');
    var surnameInput = document.getElementById('booking_surname');
    var emailInput = document.getElementById('booking_email');
    var phoneInput = document.getElementById('booking_phone');
    var tourSelect = document.getElementById('choice_tour');
    var BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc'; //  @get_id_bot and /get_id

    var CHAT_ID = '704440668'; //  let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());

    var text = encodeURI("Name: ".concat(nameInput.value, ", Surname:").concat(surnameInput.value, ", \n            Email: ").concat(emailInput.value, ", Phone: ").concat(phoneInput.value, ", Tour: ").concat(tourSelect.value));

    if (nameInput.value !== '' && surnameInput.value !== '' && emailInput.value !== '' && phoneInput.value !== '' && tourSelect.value !== '') {
      $.get("https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=") + text + '&parse_mode=html', function (json) {
        if (json.ok) {
          $("#my_booking-form").trigger('reset');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your message send!',
            showConfirmButton: false,
            timer: 3000
          });
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
  // getCard();

  $('#card_tour').slick((_$$slick = {
    infinite: true,
    speed: 900,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3
  }, _defineProperty(_$$slick, "infinite", true), _defineProperty(_$$slick, "responsive", [{
    breakpoint: 999,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2 // arrows: false,

    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1 // arrows: false,

    }
  }]), _$$slick)); // Модальное окно callback
  // открыть по кнопке

  $('.callback__btn').click(function () {
    $('.modal__callback').fadeIn();
    $('.modal__callback').addClass('disabled');
  }); // закрыть на крестик

  $('.callback__close_btn').click(function () {
    $('.modal__callback').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
  }); // закрыть по клику вне окна

  $(document).mouseup(function (e) {
    var popup = $('.callback__content');

    if (e.target != popup[0] && popup.has(e.target).length === 0) {
      $('.modal__callback').fadeOut(600);
    }
  }); // закрыть по ESC

  $(document).on('keydown', function (event) {
    if (event.keyCode == 27) {
      $('.modal__callback').fadeOut(600);
    }
  }); // Маска номера телефона

  $(function () {
    $('#callback_phone').mask('+38 (099) 999-99-9?9');
  }); // Валидация + отправка формы на Telegram BOT

  $("#my_callback-form").on('submit', function (e) {
    e.preventDefault();
    var nameInput = document.getElementById('callback_name');
    var phoneInput = document.getElementById('callback_phone');
    var BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc'; // @get_id_bot and /get_id

    var CHAT_ID = '704440668'; //   let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());

    var text = encodeURI("Name: ".concat(nameInput.value, ", Phone: ").concat(phoneInput.value));

    if (nameInput.value !== '' && phoneInput.value !== '') {
      $.get("https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=") + text + '&parse_mode=html', function (json) {
        if (json.ok) {
          $("#my_callback-form").trigger('reset');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your message send!',
            showConfirmButton: false,
            timer: 3000
          });
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
                html += "\n                    <li class=\"card__item card-first\">\n                        <div class=\"card__image\" id=\"card-img\">\n                            <a class=\"card__image_link colorbox\" data-fancybox=\"group-1\" href=\"assets/images/place_image/".concat(card.pic.big_image, "\" title=\"").concat(card.title, "\">\n                                <img class=\"card__pic\"\n                                    src=\"assets/images/place_image/").concat(card.pic.image, "\" alt=\"place_image\">\n                                <div class=\"card__price\">").concat(card.pic.price, "</div>\n                            </a>\n                        </div>\n                        <div class=\"card__content\">\n                            <div class=\"card__title\">\n                                <h6>").concat(card.title, "</h6>\n                            </div>\n                            <div class=\"card__subtitle subtitle\">\n                                <p>").concat(card.description, "</p>\n                            </div>\n                            <div class=\"card__link\">\n                                <button type=\"button\" class=\"card__link_text text_orange\" id=\"card_btn\">\n                                ").concat(card.link, "</button>\n                            </div>\n                        </div>\n                    </li>\n                ");
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
          }); // закрыть на крестик

          $('.modal__close_btn').click(function () {
            $('.booking__modal').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
          }); // colorbox plugin

          $(function () {
            $("a.card__image_link").colorbox({
              maxWidth: "90%",
              maxHeight: "90%",
              closeButton: "true"
            });
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

; // Динамические карты блока clients

function getReview() {
  $.ajax({
    url: 'common/review.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';
      json.forEach(function (item) {
        html += "\n                <li class=\"clients__cards\">\n                    <div class=\"clients__content\">\n                        <div class=\"clients__review subtitle\">\n                            <p>".concat(item.review, "\n                            </p>\n                        </div>\n                        <div class=\"clients__item\">\n                            <div class=\"clients__footer\">\n                                <div class=\"clients__avatar\">\n                                    <img class=\"clients__avatar_photo\"\n                                        src=\"assets/images/clients/").concat(item.author.avatar, "\" alt=\"author-pic\">\n                                </div>\n                                <div class=\"clients__info\">\n                                    <div class=\"clients__info_author\">").concat(item.author.name, "</div>\n                                    <div class=\"clients__info_occupation\">").concat(item.author.occupation, "</div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n                ");
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

;
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
});