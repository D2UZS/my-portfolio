// ---------------mobile nav---------------

const mobMenuToggles = document.querySelectorAll('.mob-menu-toggle');
const burgerIcon = document.querySelector('#burger');
const mobileNavContainer = document.querySelector('#mobile-nav');

for (let i = 0; i < mobMenuToggles.length; i++) {
    const mobMenuToggle = mobMenuToggles[i];
    mobMenuToggle.onclick = function() {
        burgerIcon.classList.toggle('burger-icon--close');
        mobileNavContainer.classList.toggle('mobile-nav--show');
    }
}

// ---------------mobile nav end---------------


// ---------------Popup--------------

const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseIcon = document.querySelectorAll('.popup__close');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const bookingPopupInputs = document.querySelectorAll('.booking-popup__input');

let unLock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (evt) {
            const popupName = popupLink.dataset.popup;
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);

            for (let bookingPopupInput of bookingPopupInputs) {
                bookingPopupInput.value = '';
            }
            evt.preventDefault();
        });
    }
}

if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener("click", function (evt) {
            popupClose(el.closest('.popup'));
            evt.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unLock) {
        const popupActive = document.querySelector('.popup.popup--open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('popup--open');
        curentPopup.addEventListener("click", function (evt) {
            if(!evt.target.closest('.popup__content')) {
                popupClose(evt.target.closest('.popup'));
            }
        });
    }
}


function popupClose(popupActive, doUnLock = true) {
    if (unLock) {
        popupActive.classList.remove('popup--open');
        if (doUnLock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unLock = false;
    setTimeout(function () {
        unLock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unLock = false;
    setTimeout(function () {
        unLock = true;
    }, timeout);
}

document.addEventListener('keydown', function (evt) {
    if (evt.which === 27) {
        const popupActive = document.querySelector('.popup.popup--open');
        popupClose(popupActive);
    }
});

// ---------------Popup end--------------


// ---------------map---------------

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.938784, 30.323126],
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Гостиница для котов и кошек «Котейка»',
            balloonContent: 'Гостиница для котов и кошек «Котейка»'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/decor/map-icon.png',
            // Размеры метки.
            iconImageSize: [45, 65],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-22, -65]
        });

    myMap.geoObjects
        .add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
});

// ---------------map end---------------


// ---------------up button---------------

const upButton = document.querySelector('.up-button');

window.onscroll = function () {
    if (window.pageYOffset > 200) {
        upButton.classList.add('up-button--shown');
        let mob = document.querySelector('.mobile-nav--show');
        if (mob !== null ) {
            burgerIcon.classList.toggle('burger-icon--close');
            mobileNavContainer.classList.toggle('mobile-nav--show');
        }
    } else {
        upButton.classList.remove('up-button--shown');
    }
};

upButton.onclick = function () {
    window.scrollTo(0, 0);
};

// ---------------up button end---------------