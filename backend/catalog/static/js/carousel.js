// var dots = document.getElementsByClassName("indicator");
var slides = document.getElementsByClassName("slide");
var curentIndex = slides.length - 1; // текущий индекс слайда
var duration = 10000;
plusSlide(1);
var timeId = startTimer();
// Next/previous controls
function plusSlide(n) {
    hideSlide();
    if (curentIndex + n > slides.length - 1) {
        curentIndex = 0
    } else if (curentIndex + n < 0) {
        curentIndex = slides.length - 1
    } else {
        curentIndex += n;
    }
    showSlide();
}

// Thumbnail image controls
function currentSlide(n) {
    hideSlide();
    curentIndex = n;
    showSlide();
}

function showSlide() {
    console.log(curentIndex);
    slides[curentIndex].style.display = "block";
    // dots[curentIndex].className += " active";
}

function hideSlide() {
    console.log(curentIndex);
    slides[curentIndex].style.display = "none";
    // dots[curentIndex].className = dots[curentIndex].className.replace(" active", "");
}

function startTimer() {
    return setInterval(() => {
        plusSlide(1);
    }, duration);
}

function resetTimer() {
    clearInterval(timeId);
    timeId = startTimer();
}