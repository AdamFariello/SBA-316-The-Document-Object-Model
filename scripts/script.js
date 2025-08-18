let topImg = document.getElementById("topImg")
function updateOpacity () {
    //topImg.setAttribute("opacity", 0.1)]
    let topImgStyles = window.getComputedStyle(topImg);
    const opacity = topImgStyles.getPropertyValue("opacity")
    console.log(opacity)
    topImg.style.opacity = opacity - 0.25
}