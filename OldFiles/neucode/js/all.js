(function ($) {
    "use strict"; // Start of use strict

    // Closes the sidebar menu
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('#sidebar-wrapper .js-scroll-trigger').click(function () {
        $("#sidebar-wrapper").removeClass("active");
        $(".menu-toggle").removeClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    });

    // Scroll to top button appear
    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

})(jQuery); // End of use strict

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        var e = document.getElementsByClassName('payment');
        e[0].removeAttribute("data-behaviour")
        e[0].setAttribute("data-behaviour", "link")
        e[1].removeAttribute("data-behaviour")
        e[1].setAttribute("data-behaviour", "link")
    }
}

getMobileOperatingSystem()
// Disable Google Maps scrolling
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
    var that = $(this);
    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find(
        'iframe').css("pointer-events", "none");
}
var onMapClickHandler = function (event) {
    var that = $(this);
    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);
    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");
    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);


function check(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    } else {
        alert("You have entered an invalid email address!")
        return (false)
    }
}

function sendDetails() {

    var email = document.getElementById("mail").value;
    var fname = document.getElementById("fname").value.trim();
    var lname = document.getElementById("lname").value.trim();
    var phone = document.getElementById("phone").value.trim();

    if (check(email))
        return false;

    if (fname.includes(" "))
        fname = fname.substr(0, fname.indexOf(" "));
    fname = fname.charAt(0).toUpperCase() + fname.substr(1);


    if (lname.includes(" "))
        lname = lname.substr(0, lname.indexOf(" "));
    lname = lname.charAt(0).toUpperCase() + lname.substr(1);

    var name = fname + " " + lname;


    console.log("details:" + email + name + phone);

    window.open('mailto:akul753@gmail.com?subject=Invite&body=');

    document.getElementById("donetext").style.display = "block";
    document.getElementById("formtext").style.display = "none";
}



// //
// var js_form = document.getElementById(form_id_js);
// js_form.addEventListener("submit", function (e) {
//     e.preventDefault();
// });
