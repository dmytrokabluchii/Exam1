$(function(){
    // Fix Header Scroll
    $(window).on('scroll', function(){
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
    $("#header__menu_links li a").on('click', function(e){
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top-60;
        $("html, body").animate({scrollTop:top+'px'}, 900);
    });

    // Скролл по arrow!
    $(".footer__arrow a, .item__service a").on("click", function (e) {
        e.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1400);
    });

    // Hamburger-menu
    $(".hamburger, .page_overlay").on('click', function () {
        $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
        $("body").toggleClass("open");
    });
    // Закрытие меню бургер при нажатии на пунты меню и кнопку callback
    $(".sidemenu ul li a, .mobile__btn").on('click', function () {
        $("body").removeClass("open");
    });

    
    // Модальное окно order tour
    getCard();
    // закрыть по клику вне окна
    $(document).mouseup(function (e) { 
        let popup = $('.modal__content');
        if (e.target!=popup[0]&&popup.has(e.target).length === 0){
            $('.booking__modal').fadeOut(600);
        }
    });
    // закрыть по ESC
    $(document).on('keydown',function(event) {
        if (event.keyCode == 27) {
            $('.booking__modal').fadeOut(600);
        }
    });
    // Маска номера телефона
    $(function () {
        $('#booking_phone').mask('+38 (099) 999-99-9?9');
    })
    // Валидация + отправка формы на Telegram BOT
    $("#my_booking-form").on('submit', function(e){
        e.preventDefault();
        let nameInput = document.getElementById('booking_name');
        let surnameInput = document.getElementById('booking_surname');
        let emailInput = document.getElementById('booking_email');
        let phoneInput = document.getElementById('booking_phone'); 
        let tourSelect = document.getElementById('choice_tour');              
        const BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc';
    //  @get_id_bot and /get_id
        const CHAT_ID = '704440668';
    //  let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());
        let text = encodeURI(`Name: ${nameInput.value}, Surname:${surnameInput.value}, 
            Email: ${emailInput.value}, Phone: ${phoneInput.value}, Tour: ${tourSelect.value}`);
        if(nameInput.value !== '' && surnameInput.value !== '' && emailInput.value !== '' 
        && phoneInput.value !== '' && tourSelect.value !== ''){
            $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=`+text+'&parse_mode=html', (json)=>{
                if(json.ok){
                    $("#my_booking-form").trigger('reset');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your message send!',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }
            });
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Fill all field!',
                showConfirmButton: false,
                timer: 3000
            })
        }
    });


    // Slick-slider Place
    // getCard();
    $('#card_tour').slick({
        infinite: true,
        speed: 900,
        dots: true,
        slidesToShow: 3, 
        slidesToScroll: 3,
        infinite: true,
        responsive: [
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    // arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // arrows: false,
                }
            }
        ]
    });
    

    // Модальное окно callback
    // открыть по кнопке
    $('.callback__btn, .item__service_contact a').click(function() { 
        $('.modal__callback').fadeIn();
        $('.modal__callback').addClass('disabled');
    });
    // закрыть на крестик
    $('.callback__close_btn').click(function() { 
        $('.modal__callback').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
    });
    // закрыть по клику вне окна
    $(document).mouseup(function (e) { 
        let popup = $('.callback__content');
        if (e.target!=popup[0]&&popup.has(e.target).length === 0){
            $('.modal__callback').fadeOut(600);
        }
    });
    // закрыть по ESC
    $(document).on('keydown',function(event) {
        if (event.keyCode == 27) {
            $('.modal__callback').fadeOut(600);
         }
     });

     // Маска номера телефона
     $(function () {
        $('#callback_phone').mask('+38 (099) 999-99-9?9');
    })

    // Валидация + отправка формы на Telegram BOT
    $("#my_callback-form").on('submit', function(e){
        e.preventDefault();
        let nameInput = document.getElementById('callback_name');
        let phoneInput = document.getElementById('callback_phone');            
        const BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc';
    // @get_id_bot and /get_id
        const CHAT_ID = '704440668';
    //   let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());
        let text = encodeURI(`Name: ${nameInput.value}, Phone: ${phoneInput.value}`);
        if(nameInput.value !== '' && phoneInput.value !== ''){
            $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=`+text+'&parse_mode=html', (json)=>{
                if(json.ok){
                    $("#my_callback-form").trigger('reset');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your message send!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            });
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Fill all field!',
                showConfirmButton: false,
                timer: 3000
            })
        }
    });
});


// Active menu on scroll
let sections = $('section')
    , nav = $('.nav__menu')
    , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
    let cur_pos = $(this).scrollTop();
    sections.each(function() {
        let top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
        if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');
        $(this).addClass('active');
        nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
    });
});

nav.find('a').on('click', function () {
    let $el = $(this)
        , id = $el.attr('href');
    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);
    return false;
});


// Динамические карты блока place
async function getCard(){
    await $.ajax({
        url:'common/card.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            json.forEach((card)=>{
                html += `
                    <li class="card__item card-first wow animate__zoomIn" data-wow-duration="4s">
                        <div class="card__image" id="card-img">
                            <a class="card__image_link colorbox" data-fancybox="group-1" href="assets/images/place_image/${card.pic.big_image}" title="${card.title}">
                                <img class="card__pic"
                                    src="assets/images/place_image/${card.pic.image}" alt="place_image">
                                <div class="card__price">${card.pic.price}</div>
                            </a>
                        </div>
                        <div class="card__content">
                            <div class="card__title">
                                <h6>${card.title}</h6>
                            </div>
                            <div class="card__subtitle subtitle">
                                <p>${card.description}</p>
                            </div>
                            <div class="card__link">
                                <button type="button" class="card__link_text text_orange" id="card_btn">
                                ${card.link}</button>
                            </div>
                        </div>
                    </li>
                `;
            });
            
            $("#page_card").append(html);
            $("#card_tour").slick('slickAdd', html);
        },
        error:function(){
            // modal window sweet-aler2
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: "The tour-cards don't load!",
                showConfirmButton: false,
                timer: 4000
            })
        }
    });  
    // открыть по кнопке
    $('#booking_btn, #card_btn').click(function() { 
        $('.booking__modal').fadeIn();
        $('.booking__modal').addClass('disabled');
    });
    // закрыть на крестик
    $('.modal__close_btn').click(function() { 
        $('.booking__modal').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
    });


    // colorbox plugin
    $(function(){
        $("a.card__image_link").colorbox({
            maxWidth:"90%",
            maxHeight:"90%",
            closeButton:"true"
        });
    });


    // Map Leaflet
    // инициализируем карту по клику
    $("#init_map").on('click', function(){
        // удаляем tag <a> init_map
        $(this).remove();
        // Инициализация карты
        var map = L.map('my_map').setView([24.9092452, 91.8641862], 4);
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var myIcon = L.icon({
            iconUrl: 'assets/images/svg/map-pin.svg',
            iconSize: [96, 96],
            iconAnchor: [12, 41],
            popupAnchor: [36, -25],
        });
        const marker = L.marker([24.9092452, 91.8641862], {icon:myIcon}).addTo(map)
        .bindPopup(`
        <div class="map_popup">
        <img src="assets/plugins/leflet/images/map.svg" alt="map-pic">
        <div class="map_info">
            <b>Hello! <br>
            My friend!</b>
            <div class="map_info_text">You're in Flat 20, Housing state, Sylhet!</div>
            </div>
        </div>
        `);
        // Переход по клику на маркер!
            // marker.on('click', function(){
            //     document.getElementById('to_google').click();
            // })
    });
};


// Динамические карты блока clients
function getReview(){
    $.ajax({
        url:'common/review.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            json.forEach((item)=>{
                html += `
                <li class="clients__cards">
                    <article class="clients__content">
                        <div class="clients__review subtitle">
                            <p>${item.review}
                            </p>
                        </div>
                        <div class="clients__item">
                            <div class="clients__footer">
                                <div class="clients__avatar">
                                    <img class="clients__avatar_photo"
                                        src="assets/images/clients/${item.author.avatar}" alt="author-pic">
                                </div>
                                <div class="clients__info">
                                    <div class="clients__info_author">${item.author.name}</div>
                                    <div class="clients__info_occupation">${item.author.occupation}</div>
                                </div>
                            </div>
                        </div>
                    </article>
                </li>
                `;
            });
            $("#review_clients").append(html);
        },
        error:function(){
            // modal window sweet-aler2
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: "The clients-cards don't load!",
                showConfirmButton: false,
                timer: 4000
            })
        }
    });  
};
getReview();


// Подключение lightGallery
lightGallery(document.querySelector('.gallery__album', '.album__page'), {
    plugins:[lgZoom, lgThumbnail],
    thumbnail: true,
    zoom: true,
    actualSize: true,
    animateThumb: true,
    zoomFromOrigin: true,
    speed: 500,
    licenseKey: 'your_license_key',
});


// Инициализация WOW.js for animate.css
new WOW().init();