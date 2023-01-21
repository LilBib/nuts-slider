const leftArrowElem = document.querySelector('.leftarrow') 
const rightArrowElem = document.querySelector('.rightarrow') 
const previewsCollection = document.querySelectorAll('.preview')
const navCollection = document.querySelectorAll('.nav')
const carouselElem = document.querySelector('.carousel')
let xDown = null;                                                        
let yDown = null;
let intervalID = null;

rightArrowElem.addEventListener('click', () => {
    handleMoveRight();
})
leftArrowElem.addEventListener('click', () => {
    handleMoveLeft();
})

carouselElem.addEventListener('touchstart', (evt) => {                                 
    xDown = evt.touches[0].clientX                                      
    yDown = evt.touches[0].clientY 
})
carouselElem.addEventListener('touchend', (evt) => {
    handleTouchEnd(evt);
})
window.addEventListener('resize', () => {
    roll()
})

const handleRightActivation = () => {
    let index;
    previewsCollection.forEach((preview, i) => {
        if (preview.classList.contains('active')) index=i;
    })
    previewsCollection[index].classList.remove('active')
    previewsCollection[index].classList.remove('border-blue')
    previewsCollection[index].classList.add('border-light-blue')
    navCollection[index].classList.remove('border-blue')
    navCollection[index].classList.add('border-light-blue')
    if (index===previewsCollection.length-1) {
        previewsCollection[0].classList.add('active')
        previewsCollection[0].classList.remove('border-light-blue')
        navCollection[0].classList.remove('border-light-blue')
        previewsCollection[0].classList.add('border-blue')
        navCollection[0].classList.add('border-blue')
    } else {
        previewsCollection[index + 1].classList.add('active')
        previewsCollection[index + 1].classList.remove('border-light-blue')
        navCollection[index + 1].classList.remove('border-light-blue')
        previewsCollection[index + 1].classList.add('border-blue')
        navCollection[index + 1].classList.add('border-blue')
    }
}

const handleLeftActivation = () => {
    let index;
    previewsCollection.forEach((preview, i) => {
        if (preview.classList.contains('active')) index=i;
    })
    previewsCollection[index].classList.remove('active')
    previewsCollection[index].classList.remove('border-blue')
    previewsCollection[index].classList.add('border-light-blue')
    navCollection[index].classList.remove('border-blue')
    navCollection[index].classList.add('border-light-blue')
    if (index===0) {
        previewsCollection[previewsCollection.length-1].classList.add('active')
        previewsCollection[previewsCollection.length-1].classList.remove('border-light-blue')
        navCollection[previewsCollection.length-1].classList.remove('border-light-blue')
        previewsCollection[previewsCollection.length-1].classList.add('border-blue')
        navCollection[previewsCollection.length-1].classList.add('border-blue')
    } else {
        previewsCollection[index - 1].classList.add('active')
        previewsCollection[index - 1].classList.remove('border-light-blue')
        navCollection[index - 1].classList.remove('border-light-blue')
        previewsCollection[index - 1].classList.add('border-blue')
        navCollection[index - 1].classList.add('border-blue')
    }
}

const roll = () => {
    const activePreviewCoords = document.querySelector('.active').getBoundingClientRect();
    const componentContainer = document.querySelector('.component-container').getBoundingClientRect();
    const clientWidth = document.body.clientWidth
    if (clientWidth > 1200) {
        if (activePreviewCoords.right>componentContainer.right) {
            const carouselElemCoords = carouselElem.getBoundingClientRect();
            carouselElem.style.transform = "translateX(" + ( carouselElemCoords.left - activePreviewCoords.right + componentContainer.right - (clientWidth - (componentContainer.right - componentContainer.left))/2 ) + "px)"
        }
        if (activePreviewCoords.left-20 < 0) {
            const carouselElemCoords = carouselElem.getBoundingClientRect();
            carouselElem.style.transform = "translateX(" + ( carouselElemCoords.left - activePreviewCoords.left + componentContainer.left - (clientWidth - (componentContainer.right - componentContainer.left))/2 ) + "px)"
        }
    } else if (clientWidth > 430) {
        if (activePreviewCoords.right+20>clientWidth) {
            const carouselElemCoords = carouselElem.getBoundingClientRect();
            carouselElem.style.transform = "translateX(" + ( carouselElemCoords.left - activePreviewCoords.right - 40 + clientWidth ) + "px)"
        }
        if (activePreviewCoords.left-20 < 0) {
            const carouselElemCoords = carouselElem.getBoundingClientRect();
            carouselElem.style.transform = "translateX(" + ( carouselElemCoords.left - activePreviewCoords.left) + "px)"
        }
    } else {
        if (activePreviewCoords.right+8>clientWidth) {
            const carouselElemCoords = carouselElem.getBoundingClientRect();
            carouselElem.style.transform = "translateX(" + ( carouselElemCoords.left - activePreviewCoords.right -20 + clientWidth - (clientWidth - activePreviewCoords.right + activePreviewCoords.left)/2 ) + "px)"
        }
        if (activePreviewCoords.left-8 < 0) {
            const carouselElemCoords = carouselElem.getBoundingClientRect();
            carouselElem.style.transform = "translateX(" + ( carouselElemCoords.left - activePreviewCoords.left -20 + (clientWidth - activePreviewCoords.right + activePreviewCoords.left)/2) + "px)"
        }
    }
}
const handleTouchEnd = (evt) => { 
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = evt.changedTouches[0].clientX;                                    
    var yUp = evt.changedTouches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            handleMoveRight();
        } else {
            handleMoveLeft();
        }                       
    }                                            
}

function handleMoveRight () {
    handleRightActivation();
    roll();
    window.clearInterval(intervalID)
    intervalID = window.setInterval(handleMoveRight, 4000)
}
function handleMoveLeft () {
    handleLeftActivation();
    roll();
    window.clearInterval(intervalID)
    intervalID = window.setInterval(handleMoveRight, 4000)
}
intervalID = window.setInterval(handleMoveRight, 4000)
roll();
