jQuery(document).ready(function ($) {
    // ==========================================
    // 1. تنظیمات اولیه و متغیرها
    // ==========================================
    // متغیر لوکیشن را اینجا تعریف می‌کنیم تا در تمام این بلاک قابل دسترسی باشد
    var userLocationData = {
        lat: null,
        lng: null
    };

    // ==========================================
    // 2. توابع مربوط به اسلایدر (SWIPER)
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

            if (!setting || !id) return;

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

    // اجرای اسلایدر
    if (typeof Swiper !== 'undefined') {
        initSliders();
    } else {
        $(window).on('load', function () {
            setTimeout(initSliders, 100);
        });
    }

    // ==========================================
    // 3. توابع مربوط به مکان‌یابی (GEOLOCATION)
    // ==========================================
    
    // تابع موفقیت
    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        // ذخیره در آبجکت
        userLocationData.lat = lat;
        userLocationData.lng = lng;

        // ذخیره در اینپوت‌های فرم (اگر وجود داشته باشند)
        $('#user-lat').val(lat);
        $('#user-lng').val(lng);

        console.log("موقعیت کاربر دریافت شد:", userLocationData);
        
        // اگر می‌خواهید با ایجکس به سرور بفرستید، تابع آن را اینجا صدا بزنید
        // sendLocationToBackend(lat, lng); 
    }

    // تابع خطا
    function showError(error) {
        var errorMsg = "";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMsg = "کاربر اجازه دسترسی به موقعیت مکانی را نداد.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMsg = "اطلاعات موقعیت مکانی در دسترس نیست.";
                break;
            case error.TIMEOUT:
                errorMsg = "زمان درخواست برای دریافت موقعیت تمام شد.";
                break;
            case error.UNKNOWN_ERROR:
                errorMsg = "یک خطای ناشناخته رخ داد.";
                break;
        }
        console.log(errorMsg);
    }

    // شروع درخواست لوکیشن
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("مرورگر شما از قابلیت مکان‌یابی پشتیبانی نمی‌کند.");
    }

}); // پایان بلاک امن jQuery