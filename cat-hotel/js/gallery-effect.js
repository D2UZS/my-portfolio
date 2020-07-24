// ---------------room-card--------------

let roomSmallPhotos = document.querySelectorAll('.room-card__small-photo');
let roomBigPhoto = document.querySelector('.room-card__big-photo');

if (roomSmallPhotos.length > 0) {
    for (let roomSmallPhoto of roomSmallPhotos) {
        roomSmallPhoto.addEventListener("click", function () {
            let urlСurrentPhoto = roomSmallPhoto.getAttribute('src');
            let urlChange = roomBigPhoto.getAttribute('src');
            roomBigPhoto.src = urlСurrentPhoto;
            roomSmallPhoto.src = urlChange;
        });
    };
};

// ---------------room-card end--------------