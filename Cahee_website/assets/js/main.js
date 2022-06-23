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
    });

    // hamburger-menu
    $(".hamburger, .page_overlay").on('click', function () {
        $(".hamburger").toggleClass("is-active");
        $("body").toggleClass("open");
    });
    // Закрытие меню бургер при нажатии на пунты меню
    $(".sidemenu ul li a, .mobile_logo a").on('click', function () {
        $("body").removeClass("open");
    });

    // Плавный Scroll main menu + Скролл по arrow!
    $(".header__menu ul li a, .virtual-mouse, .header__logo").on('click', function (e) {
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top - 80;
        $('body,html').animate({
            scrollTop: top + 'px'
        }, 1100);
    });

    // Phone-mask
    $('.phone').mask('+38 (099) 999-99-9?9');
    
    // Send-form
    $('.send-form, .subscribe-form').click( function() {
        const form = $(this).closest('form');
    	if ( form.valid() ) {
    		// form.css('opacity','.8');
    		let actUrl = form.attr('action');
    		$.ajax({
    			url: actUrl,
    			type: 'post',
    			data: form.serialize(),
    			success: function(data) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your message send!',
                        showConfirmButton: false,
                        timer: 5000,
                    });   
    			},
    			error: function() {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Server error, the message can not be send!',
                        showConfirmButton: false,
                        timer: 5000
                    });
    			}
    		});
            // Очистка формы метод .reset()
            document.getElementById('my_form','my_subscribe-form').reset(); 
    	}
    });
});
