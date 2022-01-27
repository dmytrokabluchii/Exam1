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
    $("#header__menu_links a").on('click', function(e){
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top-60;
        $("html, body").animate({scrollTop:top+'px'}, 1400);
    });

    // Скролл по arrow!
    $(".footer__arrow a").on("click", function (e) {
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
    // Закрытие меню бургер при нажатии на пунты меню
    $(".sidemenu ul li a").on('click', function () {
        $("body").removeClass("open");
    });


    // Slick-slider Place
    getCard();
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
                    arrows: false,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    });
    // Slick-slider review
    /* getReview();
    $('#review_clients').slick({
        infinite: true,
        speed: 900,
        dots: true,
        slidesToShow: 3, 
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    }); */
});


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


// Динамические карты блока place
function getCard(){
    $.ajax({
        url:'common/card.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            json.forEach((card)=>{
                html += `
                    <li class="card__item card-first">
                        <div class="card__image">
                            <a class="card__image_link" href="#!">
                                <img class="card__pic lazy"
                                    src="assets/images/${card.pic.image}" alt="place_image">
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
                                <a class="card__link_text text_orange" href="#!">${card.link}
                                </a>
                            </div>
                        </div>
                    </li>
                `;
            });

            $("#card_tour").slick('slickAdd', html);
        },
        error:function(){
            panel.warning("The card don't load!", true);
        }
    });  
}

// Динамический подсчет блока place
function getCount(){
    $.ajax({
        url:'common/count.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            json.forEach((count)=>{
                html += `
                    <div class="count__column">
                        <div class="count__column_calculation"><span class="count__column_green">${count.calc}</span>+</div>
                        <div class="count__column_text">${count.title}</div>
                    </div>
                `;
            });
            $("#place_count").append(html);
        },
        error:function(){
            panel.warning("The count of tours don't load!", true);
        }
    });  
}
getCount();

// Модальное окно
// function toggleForm() {
//     document.body.classList.toggle('activeForm');
// }


// Динамические карты блока clients
// function getReview(){
//     $.ajax({
//         url:'common/review.json',
//         type:'get',
//         dataType:'json',
//         success:function(json){
//             let html = '';
//             json.forEach((item)=>{
//                 html += `
//                 <div class="clients__cards">
//                     <div class="clients__content">
//                         <div class="clients__review subtitle">
//                             <p>${item.review}
//                             </p>
//                         </div>
//                         <div class="clients__item">
//                             <div class="clients__footer">
//                                 <div class="clients__avatar">
//                                     <img class="clients__avatar_photo lazy"
//                                         src="assets/images//${item.author.avatar}" alt="author-pic">
//                                 </div>
//                                 <div class="clients__info">
//                                     <div class="clients__info_author">${item.author.name}</div>
//                                     <div class="clients__info_occupation">${item.author.occupation}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 `;
//             });

//             $("#review_clients").slick('slickAdd', html);
//         },
//         error:function(){
//             panel.warning("The review don't load!", true);
//         }
//     });  
// }
