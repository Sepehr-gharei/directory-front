jQuery(document).ready(function ($) {

    // ==========================================
    // 1. SLIDERS (Swiper)
    // ==========================================
    function initSliders() {
        if (typeof Swiper === 'undefined') {
            console.error('Swiper library is not loaded');
            return;
        }

        $('.slider').each(function () {
            var $slider = $(this);
            var setting = $slider.attr("data-settings");
            var id = $slider.attr("id");

            if (!setting || !id) {
                return;
            }

            try {
                var items = JSON.parse(setting);
            } catch (e) {
                return;
            }

            var autoplaySetting = items.autoplay === "false" ? false : {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            };

            try {
                const swiper = new Swiper('#' + id, {
                    slidesPerView: items.columns || 1,
                    navigation: {
                        nextEl: '.button-next-' + id,
                        prevEl: '.button-prev-' + id,
                    },
                    autoplay: autoplaySetting,
                    loop: items.infinite || false,
                    centeredSlides: items.centerMode || false,
                    spaceBetween: parseInt(items.space) || 0,
                    pagination: {
                        el: '#' + id + ' .swiper-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    breakpoints: {
                        10: { slidesPerView: items.columns_mobile || 1 },
                        480: { slidesPerView: items.columns_mobile_tablet || 1 },
                        768: { slidesPerView: items.columns_tablet || 1 },
                        1024: { slidesPerView: items.columns || 1 },
                    }
                });
            } catch (e) {
                console.error('Error initializing Swiper:', e, id);
            }
        });
    }

    if (typeof Swiper !== 'undefined') {
        initSliders();
    } else {
        $(window).on('load', function () {
            setTimeout(initSliders, 100);
        });
    }
});