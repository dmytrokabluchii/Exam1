$(function(){
    // Fix Header Scroll
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

    // Плавный скролл по меню!
    $("#main_menu a").on('click', function(e){
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top-60;
        $("html, body").animate({scrollTop:top+'px'}, 900);
    });
    // Скролл по arrow!
    $(".about-arrow a").on("click", function (e) {
        e.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1400);
    });


    // Slick-slider News
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
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                verticalSwiping: false,
                }
            }
        ]
    });
    $('#slider-horizontal').slick({
        infinite: true,
        speed: 900,
        dots: true,
        slidesToShow: 3, 
        slidesToScroll: 1,
        // slidesPerRow: 3,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            }
            },
            {
                breakpoint: 760,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
            }
        ]   
    });


    // Hamburger-menu
    $(".hamburger, .page_overlay").on('click', function () {
        // $(".hamburger").toggleClass("is-active");
        $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
        $("body").toggleClass("open");
    });
    // Закрытие меню бургер при нажатии на пунты меню
    $(".sidemenu ul li a").on('click', function () {
        $("body").removeClass("open");
    });


    // Map Leaflet
    // инициализируем карту по клику
    $("#init_map").on('click', function(){
    // удаляем tag <a> init_map
    $(this).remove();
    // Инициализация карты
    var map = L.map('my_map').setView([41.653955,-74.7021683], 8);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var myIcon = L.icon({
        iconUrl: 'assets/images/svg/map-pin.svg',
        iconSize: [96, 96],
        iconAnchor: [12, 41],
        popupAnchor: [36, -25],
    });
    const marker = L.marker([41.653955,-74.7021683], {icon:myIcon}).addTo(map)
    .bindPopup(`
    <div class="map_popup">
    <img src="assets/plugins/leflet/images/map.svg" alt="map-pic">
    <div class="map_info">
        <b>Hello! <br>
        My friend!</b>
        <div>You're in 91 Nolan Extension Suite 670!</div>
        </div>
    </div>
    `);
    // Переход по клику на маркер!
        marker.on('click', function(){
            document.getElementById('to_google').click();
        })
    });


    // Отправка формы на Telegram BOT
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
                    panel.success("Message successfully send", true);
                }
            });
        }
    });

});


// Подключение lightGallery
lightGallery(document.querySelector('.my-gallery'), {
    plugins:[lgZoom, lgThumbnail],
    thumbnail: true,
    zoom: true,
    actualSize: true,
    animateThumb: true,
    zoomFromOrigin: true,
    speed: 500,
    licenseKey: 'your_license_key',
});


// Ajax Динамические пост новостей
function getNews(){
    $.ajax({
        url:'common/news.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            json.forEach((card)=>{
                html += `
                <li class="slider__item">
                    <div class="slider__item-container">
                        <div class="slider__item-content" id="news-card_first">
                            <div class="slider__content_header">
                                <img class="slider__content_img"
                                src="assets/images/${card.pic}" 
                                alt="news-pic"">
                            </div>
                            <div class="slider__content_title">
                                <h4 class="blue-text">${card.title}</h4>
                                </div>
                            <div class="slider__content_subtitle">
                                <p>${card.description}</p>
                            </div>
                            <div class="slider__content_footer author">
                                <div class="slider__content_avatar">
                                    <img class="slider__content_photo"
                                    src="assets/images/${card.author.avatar}"
                                    alt="author-pic">
                                </div>
                                <div class="slider__footer_text">
                                    <div class="slider__content_author">${card.author.name} </div>
                                    <div class="slider__content_date">${card.author.date} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="slider__item-link" href="javascript:void(0);"></a>
                </li>
            `;
            });

            $("#slider-horizontal").slick('slickAdd', html);
        },
        error:function(){
            panel.warning("The news don't load!", true);
        }
    });  
}