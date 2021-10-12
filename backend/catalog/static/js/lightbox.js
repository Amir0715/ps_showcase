function openModal() {
    document.getElementById('lightbox').style.display = "block";
  }
  
  function closeModal() {
    document.getElementById('lightbox').style.display = "none";
  }
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("lightbox-container_body_slide_img");
    var dots = document.getElementsByClassName("lightbox-container_body_demos_img");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" demo_img_active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " demo_img_active";
  }