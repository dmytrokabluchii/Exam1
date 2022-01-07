"use strict";

$(function () {
  // Fix Header Scroll
  $(window).on('scroll', function () {
    // if($(window).scrollTop()>$(".main").height()){
    // вариант ниже с высотой а выше с классом
    if ($(window).scrollTop() > 0) {
      if (!$("header").hasClass("fixed_header")) {
        $("header").addClass("fixed_header");
      }
    } else {
      if ($("header").hasClass("fixed_header")) {
        $("header").removeClass("fixed_header");
      }
    }
  }); // Плавный скролл по меню!

  $("#main_menu a").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 60;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 900);
  }); // Скролл по arrow!

  $(".about-arrow a").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1400);
  }); // Slick-slider News

  getNews();
  $('.slick__wrapper_vertical').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1100,
    vertical: true,
    verticalSwiping: true,
    dots: true,
    arrows: false,
    // swipe: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        verticalSwiping: false
      }
    }]
  });
  $('#slider-horizontal').slick({
    infinite: true,
    speed: 900,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // slidesPerRow: 3,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 760,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  }); // Hamburger-menu

  $(".hamburger, .page_overlay").on('click', function () {
    // $(".hamburger").toggleClass("is-active");
    $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  }); // Закрытие меню бургер при нажатии на пунты меню

  $(".sidemenu ul li a").on('click', function () {
    $("body").removeClass("open");
  }); // Map Leaflet
  // инициализируем карту по клику

  $("#init_map").on('click', function () {
    // удаляем tag <a> init_map
    $(this).remove(); // Инициализация карты

    var map = L.map('my_map').setView([41.653955, -74.7021683], 8);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var myIcon = L.icon({
      iconUrl: 'assets/images/svg/map-pin.svg',
      iconSize: [96, 96],
      iconAnchor: [12, 41],
      popupAnchor: [36, -25]
    });
    var marker = L.marker([41.653955, -74.7021683], {
      icon: myIcon
    }).addTo(map).bindPopup("\n    <div class=\"map_popup\">\n    <img src=\"assets/plugins/leflet/images/map.svg\" alt=\"map-pic\">\n    <div class=\"map_info\">\n        <b>Hello! <br>\n        My friend!</b>\n        <div>You're in 91 Nolan Extension Suite 670!</div>\n        </div>\n    </div>\n    "); // Переход по клику на маркер!

    marker.on('click', function () {
      document.getElementById('to_google').click();
    });
  }); // Telegram BOT

  $("#my_form").on('submit', function (e) {
    e.preventDefault();
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email_contact');
    var BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc'; // @get_id_bot and /get_id

    var CHAT_ID = '704440668'; //   let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());

    var text = encodeURI("Name: ".concat(nameInput.value, ", Email: ").concat(emailInput.value));

    if (nameInput.value !== '' && emailInput.value !== '') {
      $.get("https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=") + text + '&parse_mode=html', function (json) {
        if (json.ok) {
          $("#my_form").trigger('reset');
          panel.success("Message successfully send", true);
        }
      });
    }
  });
}); // Подключение lightGallery

lightGallery(document.querySelector('.my-gallery'), {
  plugins: [lgZoom, lgThumbnail],
  thumbnail: true,
  zoom: true,
  actualSize: true,
  animateThumb: true,
  zoomFromOfigin: true,
  speed: 500,
  licenseKey: 'your_license_key'
}); // Ajax Динамические пост новостей

function getNews() {
  $.ajax({
    url: 'common/news.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';
      json.forEach(function (card) {
        html += "\n                <li class=\"slider__item\">\n                    <div class=\"slider__item-container\">\n                        <div class=\"slider__item-content\" id=\"news-card_first\">\n                            <div class=\"slider__content_header\">\n                                <img class=\"slider__content_img\"\n                                src=\"assets/images/".concat(card.pic, "\" \n                                alt=\"news-pic\"\">\n                            </div>\n                            <div class=\"slider__content_title\">\n                                <h4 class=\"blue-text\">").concat(card.title, "</h4>\n                                </div>\n                            <div class=\"slider__content_subtitle\">\n                                <p>").concat(card.description, "</p>\n                            </div>\n                            <div class=\"slider__content_footer author\">\n                                <div class=\"slider__content_avatar\">\n                                    <img class=\"slider__content_photo\"\n                                    src=\"assets/images/").concat(card.author.avatar, "\"\n                                    alt=\"author-pic\">\n                                </div>\n                                <div class=\"slider__footer_text\">\n                                    <div class=\"slider__content_author\">").concat(card.author.name, " </div>\n                                    <div class=\"slider__content_date\">").concat(card.author.date, " </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <a class=\"slider__item-link\" href=\"javascript:void(0);\"></a>\n                </li>\n            ");
      });
      $("#slider-horizontal").slick('slickAdd', html);
    },
    error: function error() {
      panel.warning("The news don't load!", true);
    }
  });
}