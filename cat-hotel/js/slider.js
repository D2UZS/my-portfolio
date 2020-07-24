// ---------------slider---------------

$(document).ready(function () {
    $('.rooms-slider').slick({
        arrows: false,
        dots: true,
        adaptiveHeight: true,
        autoplay: true,
        pauseOnHover: true,
        mobileFirst: true,
        responsive:[
            {
                breakpoint: 1365,
                settings: {
                    arrows: true
                }
            }
        ]
    });
});

$(document).ready(function () {
    $('.reviews-slider').slick({
        infinite: false,
        variableWidth: true,
        arrows: false,
        dots: true,
        adaptiveHeight: true,
        autoplay: false,
        pauseOnHover: true,
        mobileFirst: true,
        responsive:[
            {
                breakpoint: 1366,
                settings: {
                    arrows: true
                }
            }
        ]
    });
});

// ---------------slider end---------------