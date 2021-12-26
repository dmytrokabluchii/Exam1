// Fix Header Scroll
/* $(function () {
    menu_top = $('.header__content').offset().top;
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > menu_top) {
            if ($('.header__content').css('position') != 'fixed') {
                $('.header__content').css('position', 'fixed');
                $('.header__content').css('top', '0');
                $('.header__content').css('left', '0');
                $('.header__content').css('padding-top', '5px');
                $('.header__content').css('width', '100%');
                $('.header__content').css('height', '60px');
                $('.header__content').css('z-index', '9999');
                $('.header__content').css('opacity', '.9');
                $('.header__content').css('background', 'linear-gradient(243.43deg, #7E5AFF 16.9%, #55B7FF 83.27%)');
                $('.header__content').css('backdrop-filter', 'blur(2px)');
                $('.main').css('margin-top', '60px');
            }
        } else {
            if ($('.header__content').css('position') == 'fixed') {
                $('.header__content').css('position', '');
                $('.header__content').css('top', '');
                $('.header__content').css('left', '');
                $('.header__content').css('z-index', '');
                $('.header__content').css('background-color', '');
                $('.header__content').css('backdrop-filter', '');
                $('.main').css('margin-top', '');
            }
        }
    });
});  */


$(function(){
    $(window).on('scroll', function(){
        // if($(window).scrollTop()>$(".main").height()){
            // вариант ниже с высотой а выше с классом
            
            if($(window).scrollTop()>0){
                if(!$("header").hasClass("fixed_header")) {
                    $("header").addClass("fixed_header");
                }
        }else{
                if($("header").hasClass("fixed_header")){
                    $("header").removeClass("fixed_header");
                }
            }
    });

    // Решение по плавному скролу по меню!
    $("#main_menu a").on('click', function(e){
        e.preventDefault();
        // top-60 это в px отступ вниз
        const top = $($(this).attr("href")).offset().top-60;
        // 500 это в мс время анимации при прокрутке, scrollTop:top+'px' анимация scrollTop к указанной позиции
        $("html, body").animate({scrollTop:top+'px'}, 800);
    });
});


// Map Leaflet
var map = L.map('my__map').setView([49.074670019181646, 33.4165501110005], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: 'assets/images/svg/map-pin.svg',
    iconSize: [106, 106],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -76],
    // shadowUrl: 'assets/plugins/leflet/images/marker-shadow.png',
    // shadowSize: [41, 41],
    // shadowAnchor: [22, 41]
});

L.marker([49.074670019181646, 33.4165501110005], {icon:myIcon}).addTo(map)
.bindPopup(`
<div class="map_popup">
  <img src="assets/plugins/leflet/images/map.svg" alt="map-pic">
  <div class="map_info">
    <b>Hello!</b>
    </div>
</div>
`);


// Telegram BOT
$("#my_form").on('submit', function(e){
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email_contact');            
  const BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc';
  // @get_id_bot and /get_id
  const CHAT_ID = '704440668';
//   let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());
let text = encodeURI(`Name: ${nameInput.value}, Email: ${emailInput.value}`);
 if(nameInput.value !== '' && emailInput.value !== ''){
    $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=`+text+'&parse_mode=html', (json)=>{
        if(json.ok){
            $("#my_form").trigger('reset');
            alert("Message successfully send");
        }
    });
 }
});

// Подключение lightGallery
lightGallery(document.querySelector('.my-gallery'), {
    plugins:[lgZoom, lgThumbnail],
    thumbnail: true,
    zoom: true,
    actualSize: true,
    animateThumb: true,
    zoomFromOfigin: true,
    speed: 500,
    licenseKey: 'your_license_key',
});


// Slick-slider
$(function(){
    $('.slick__wrapper_vertical').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1100,
        vertical: true,
        verticalSwiping: true,
        dots: true,
        arrows: false,
      });

    //   $('.slick__wrapper_menu').slick({
    //     infinite: true,
    //     speed: 1100,
    //     dots: true,
    //     arrows: false,
    //   });

    $('.slider__items').slick({
        infinite: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1
      });
          

});





/* lightGallery(document.getElementById('gallery-container'), {
    speed: 500,
    mode: 'fade',
    
});
 */

// Swiper Slider
/* let swiper = new Swiper('.swiper', {
    direction: "vertical",
    speed: 400,
    pagination: {
      el: ".swiper-pagination",
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
  }); */

 /*  let pageSlider = new Swiper('.page', {
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",
    direction: "vertical",
    slidePerView: 'auto',
    speed: 400,
    pagination: {
        el: ".page__pagination",
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
      },
  }); */

// ChiefSlider
/* document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.slider', {
        loop: true,
        autoplay: true,
        interval: 5000,
        refresh: true,
    });
}); */


// Ajax
/* $(function(){
loadPage('pages/main.html');
    $.ajax({
        url:'common/menu.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            for(let i=0;i<json.length;i++){
                html += `<a class="me-3 py-2 text-dark text-decoration-none" href="pages/${json[i].file}.html">${json[i].name}</a>`;
            }
            $('#main_menu').html(html);         
        },
        error:function(){           
            alert("Menu JSON not found");
        }
    });

    $(document).on('click', '#main_menu a', function(e){
        e.preventDefault();
        loadPage($(this).attr("href"));
    });
}); */

