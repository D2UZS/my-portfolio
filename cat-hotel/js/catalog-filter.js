// ---------------filter---------------

let filterPopup = document.getElementById('filters-popup');
let filters = document.getElementById('filters');

let checkboxAll = filterPopup.querySelectorAll('.filters-form__input');
let filterReset = filterPopup.querySelector('.filter-reset');
let filterSelect = document.getElementById('filter-select');
let checkboxAreaAll = filterPopup.querySelectorAll('.input-area');
let checkboxEquipmentAll = filterPopup.querySelectorAll('.input-equipment');
let inputPriceAll = filterPopup.querySelectorAll('.fieldset-price__input');
let filtAll = document.querySelectorAll('.filt');

let minPrice = filterPopup.querySelector('.price-lower');
let maxPrice = filterPopup.querySelector('.price-upper');
let roomCardAll = document.querySelectorAll('.catalog__room');


let screenWidth = document.body.clientWidth;
if (screenWidth > 1365) {
    filterReset = filters.querySelector('.filter-reset');
    checkboxAll = filters.querySelectorAll('.filters-form__input');
    checkboxAreaAll = filters.querySelectorAll('.input-area');
    inputPriceAll = filters.querySelectorAll('.fieldset-price__input');
    minPrice = filters.querySelector('.price-lower');
    maxPrice = filters.querySelector('.price-upper');
    checkboxEquipmentAll = filters.querySelectorAll('.input-equipment');
}


// Проверка цены номера
let checkMaxMinPrice = function (item) {
    let empty = true;
    let restrict = true;
    if (minPrice.value !== '') {
        empty = false;
        if (+minPrice.value > +item.dataset.price) {
            restrict = false;
        }
    }
    if (maxPrice.value !== '') {
        empty = false;
        if (+maxPrice.value < +item.dataset.price) {
            restrict = false;
        }
    }

    let checkPrice = {};
    checkPrice.empty = empty;
    checkPrice.restrict = restrict;

    return checkPrice;
}


// Проверка площади номера
let checkInputArea = function (item) {
    let empty = true;
    let restrict = false;

    for (let checkbox of checkboxAreaAll) {
        if (checkbox.checked) {
            empty = false;
            if (checkbox.value === item.dataset.area) {
                restrict = true;
            }
        }

    }

    let checkArea = {};
    checkArea.empty = empty;
    checkArea.restrict = restrict;

    return checkArea;
}


// Проверка оснащения номера
let checkInputEquipment = function (item) {
    let empty = true;
    let restrict = false;

    for (let checkbox of checkboxEquipmentAll) {
        if (checkbox.checked) {
            empty = false;
            if (item.dataset.equipment.indexOf(checkbox.value) > -1 ) {
                restrict = true;
            } else {
                restrict = false;
                break;
            }
        }
    }

    let checkEquipment = {};
    checkEquipment.empty = empty;
    checkEquipment.restrict = restrict;

    return checkEquipment;
}


// Функция фильтр
let filterRooms = function () {
    for (let roomCard of roomCardAll) {
        roomCard.classList.remove('catalog__room--show');

        let checkPrice = checkMaxMinPrice(roomCard);
        let checkArea = checkInputArea(roomCard);
        let checkEquipment = checkInputEquipment(roomCard);
        if ((checkPrice.empty || checkPrice.restrict) && (checkArea.empty || checkArea.restrict) && (checkEquipment.empty || checkEquipment.restrict)) {
            roomCard.classList.add('catalog__room--show');
        }
    }
}

// Проверка при выборе инпута
for (let filt of filtAll) {
    filt.onchange = filterRooms;
}


// Кнопка сброса фильтров
filterReset.addEventListener('click', function () {
    for (let checkbox of checkboxAll) {
        checkbox.removeAttribute('checked');
    }
    for (let roomCard of roomCardAll) {
        roomCard.classList.add('catalog__room--show');
    }
})

filterSelect.onclick = filterRooms;


window.onload = filterRooms;

// ---------------filter end---------------


// ---------------sort rooms card---------------

let sortBtn = document.getElementById('btn-sort');


sortBtn.onchange = function () {
    if (sortBtn.value === 'area-up') {
        sortCardRoom('area', 'up')
    } else if (sortBtn.value === 'area-down') {
        sortCardRoom('area', 'down')
    } else if (sortBtn.value === 'price-up') {
        sortCardRoom('price', 'up')
    } else if (sortBtn.value === 'price-down') {
        sortCardRoom('price', 'down')
    }
}


// Сбор значени заданного атрибута
let getCollectAttribute = function (nameAttribute) {
    let arrayAttribute = [];
    if (nameAttribute === 'price') {
        for (let attributeRoom of roomCardAll) {
            arrayAttribute.push(attributeRoom.dataset.price);
        }
    } else if (nameAttribute === 'area')
        for (let attributeRoom of roomCardAll) {
            arrayAttribute.push(attributeRoom.dataset.area);
        }
    return arrayAttribute;
}


// Сортировка значений атрибутов
let sortAttribute = function (array, typeSort) {
    for (let i = 0; i < array.length - 1;  i++) {
        for (let j = i+1; j < array.length; j++) {
            if (typeSort === 'up') {
                if (+array[i] > +array[j]) {
                    let change = array[i];
                    array[i] = array[j];
                    array[j] = change;
                }
            } else if (typeSort === 'down') {
                if (+array[i] < +array[j]) {
                    let change = array[i];
                    array[i] = array[j];
                    array[j] = change;
                }
            }

        }
    }
    return array;
}


// Меняем местами карточки
let changeOrder = function (sortArray, nameAttribute) {
    for (let i = 0; i < sortArray.length; i++) {
        for (let roomCard of roomCardAll) {
            if (nameAttribute === 'price') {
                if (sortArray[i] === roomCard.dataset.price) {
                    roomCard.style.order = String(i);
                }
            } else if (nameAttribute === 'area') {
                if (sortArray[i] === roomCard.dataset.area) {
                    roomCard.style.order = String(i);
                }
            }
        }
    }
}


// Функция сортировки карточек
let sortCardRoom = function (attribute, upOrDown) {
    let collectAttribute = getCollectAttribute(attribute);
    let sortCollectAttribute = sortAttribute(collectAttribute, upOrDown);
    changeOrder(sortCollectAttribute, attribute);
}


// Сортировка карточек по загрузке страницы
if (sortBtn.value === 'area-up') {
    sortCardRoom('area', 'up')
} else if (sortBtn.value === 'area-down') {
    sortCardRoom('area', 'down')
} else if (sortBtn.value === 'price-up') {
    sortCardRoom('price', 'up')
} else if (sortBtn.value === 'price-down') {
    sortCardRoom('price', 'down')
}

// ---------------sort rooms card---------------