let galleryImages = document.querySelectorAll(".gallery > img");
let elements = Array.from(galleryImages);
let getLatestOpenedImg;
let windowWidth = window.innerWidth;
let calcNewImg;
let rootFolder;

let curGallery = document.querySelectorAll('active');

if (galleryImages) {

    console.log(elements)

    galleryImages.forEach(function (image, index) {
        image.addEventListener('click', function () {
            let getFullImgUrl = image.currentSrc;

            console.log(image.currentSrc);

            let getImgUrlPos = getFullImgUrl.split("/suites");

            console.log(getImgUrlPos);

            let test = getImgUrlPos[1].split('"');
            let setNewImgUrl = test[0];

            console.log(setNewImgUrl);

            getLatestOpenedImg = index + 1;

            //Further breakdown image path to isolate suite root-folder and image title
            let folderPath = setNewImgUrl.split("/");
            rootFolder = folderPath[1];
            let imageTitle = folderPath[2];

            console.log("Root Folder: " + rootFolder);
            console.log("Image Title: " + imageTitle);

            let imgNameStart = imageTitle.split('0');

            console.log(imgNameStart);

            //Create image window popup, arrows and close button
            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "../images/suites/" + rootFolder + "/" + imageTitle);
            newImg.setAttribute("id", "current-img");

            newImg.onload = function () {

                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");

                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");

                let closeBtn = document.createElement("a");
                let closeBtnText = document.createTextNode("");
                closeBtn.appendChild(closeBtnText);
                container.appendChild(closeBtn);
                closeBtn.setAttribute("class", "close-btn");
                closeBtn.setAttribute("onclick", "closeImg()");

            }

        });
    });
}

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
    document.querySelector(".close-btn").remove();
}

function changeImg(changeDir) {
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);


    if (changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if (changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "../images/suites/" + rootFolder + "/" + rootFolder + "-0" + calcNewImg + ".png");
    newImg.setAttribute("id", "current-img");
    getLatestOpenedImg = calcNewImg;
    console.log("Image Number: " + calcNewImg);

}