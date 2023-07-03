let suitesListArray = Array.from(document.getElementsByClassName('suite-item'));
let gallerySectionArray = Array.from(document.getElementsByClassName('gallery-section'));
let btnLink = document.getElementsByClassName('gallery-end-section')[0].children[0].href;
let galleryImageArray;
let currIndex = 0;
let indexMap = new Map([
    ["family", 0],
    ["single", 1],
    ["kingston", 2],
    ["camping", 3]
]);
let linkMap = new Map([
    [0, "https://abnb.me/2BOZhx2FBxb"],
    [1, "https://abnb.me/p3x9nz4FBxb"],
    [2, "https://abnb.me/JInOH0tpWzb"],
    [3, "https://abnb.me/UBuuBvKOezb"]
]);
let selectedSuiteName;
let hrefPath;
let srcPath;

//Swipe jesture variables
let touchstartX = 0;
let touchendX = 0;
let gesturedZone = document.getElementById('gesturedZone');

//Swipe logic
gesturedZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

gesturedZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    if (Math.abs(touchendX - touchstartX) > 10) {
        getActive();
    }
}, false);


//This function identifies the currently selected suite
function getSuite(val) {
    if (isNaN(val)) {
        if (val === "prev") {
            if (currIndex === 0) {
                currIndex = 3
            } else {
                currIndex -= 1;
            }
        } else {
            if (currIndex === 3) {
                currIndex = 0;
            } else {
                currIndex += 1;
            }
        }
    } else {
        //If suite item is selected via thumbs-container
        currIndex = val;
    }
    updateImageGallery();

}

function getActive() {
    let srcName;
    suitesListArray.forEach((titleItem) => {
        let curSrc = titleItem.children[0].src.split('/');
        if (titleItem.classList.contains('swiper-slide-active')) {
            srcName = curSrc[curSrc.length - 1].split('-')[0];
            // document.getElementById("gallery-title").innerText = srcName.charAt(0).toUpperCase() + srcName.slice(1) + " Suite Gallery";
        }
    })
    currIndex = indexMap.get(srcName);
    updateImageGallery();
}

function updateImageGallery() {
    //Change Suite Gallery Title
    selectedSuiteName = suitesListArray[currIndex].outerText.split(' ')[0];
    document.getElementById("gallery-title").innerText = selectedSuiteName + " Suite Gallery";

    //Update Gallery images to reflect currently selected suite
    galleryImageArray = Array.from(gallerySectionArray[0].getElementsByTagName('a'));

    //cycle through all <a> tags and update the href and image src paths
    galleryImageArray.forEach((item, index) => {
        hrefPath = item.href.split('suites/');
        srcPath = item.childNodes[1].src.split('suites/');
        let newPath = hrefPath[0] + "suites/" + selectedSuiteName.toLowerCase() + "/" + selectedSuiteName.toLowerCase() + "-0" + (index + 1) + ".jpg";
        item.href = newPath;
        item.childNodes[1].src = srcPath[0] + "suites/" + selectedSuiteName.toLowerCase() + "/" + selectedSuiteName.toLowerCase() + "-0" + (index + 1) + ".jpg";
    })
    document.getElementsByClassName('gallery-end-section')[0].children[0].href = linkMap.get(currIndex);
}

