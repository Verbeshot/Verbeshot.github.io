// Excecutes function on scroll
window.onscroll = function() {stickyFunction()};

// Defines the the navbar element as an object
var nav = document.getElementById("main-nav");

// Defines initial position of nav
var sticky = nav.offsetTop;

// Sticks the navbar on the top of the page when you scroll past it
function stickyFunction() {
  if (window.pageYOffset >= sticky) {
    nav.style.position = "sticky";
  } else {
    nav.style.position = "static";
  }
} 