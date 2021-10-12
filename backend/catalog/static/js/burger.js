$(document).ready(function () {
    $('.header_flex-wraper__right__menu').click(function (event) {
        $('.header_flex-wraper__right__menu, .header_flex-wraper__left__navbar').toggleClass('active');
    });
    let arrow = document.querySelectorAll('.drop_menu');
    for (i = 0; i < arrow.length; i++) {
        let submenu = arrow[i].parentNode.nextElementSibling;
        let thisArrow = arrow[i];
        thisArrow.addEventListener('click', function () {
            submenu.classList.toggle('active');
            thisArrow.classList.toggle('active');
        }
        )
    }
});