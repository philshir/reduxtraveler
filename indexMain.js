

const hamburger = document.querySelector('.container')
const slider = document.querySelector(".slider")
const newOverlay = document.querySelector(".start")
const arrow = document.getElementsByClassName("fa-caret-down")

const tester = () => {
     slider.classList.toggle("move");
     newOverlay.classList.toggle("overlay");
     hamburger.classList.toggle("change");
     hamburger.setAttribute("aria-expanded", hamburger.classList.contains("change"));
}

// Close the menu
const closeMenu = () => {
  slider.classList.remove("move")
  hamburger.classList.remove("change")
  hamburger.setAttribute("aria-expanded", "false")
  newOverlay.classList.remove("overlay")
}

// One menu serves both layouts: hamburger slider below 1170px, horizontal bar at 1170px+
const desktopQuery = window.matchMedia("(min-width: 1170px)");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");

// Close every submenu (CSS shows a submenu when its button has aria-expanded="true")
const closeDropdowns = () => {
  dropdownBtns.forEach(btn => {
    btn.classList.remove("active");
    btn.setAttribute("aria-expanded", "false");
  });
};

dropdownBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const wasOpen = btn.getAttribute("aria-expanded") === "true";
    closeDropdowns();
    // Open this one only if it wasn't already open
    if (!wasOpen) {
      btn.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// Detect all clicks on the document
document.addEventListener("click", function(event) {
	// If user clicks inside the element, do nothing
	if (event.target.closest(".slider") || event.target.closest(".container")) return;

	// If user clicks outside the element, hide it!
  closeMenu()
  // On desktop, also close any submenu opened by click/keyboard
  if (desktopQuery.matches) closeDropdowns()
});

// Close the menu (mobile) or the open submenu (desktop) with the Escape key
document.addEventListener("keydown", function(event) {
  if (event.key !== "Escape") return;

  if (desktopQuery.matches) {
    const openBtn = document.querySelector('.dropdown-btn[aria-expanded="true"]');
    if (!openBtn) return;
    closeDropdowns()
    openBtn.focus()
    return;
  }

  if (!slider.classList.contains("move")) return;
  closeMenu()
  hamburger.focus()
});

// Reset menu state when crossing the desktop/mobile breakpoint
desktopQuery.addEventListener("change", () => {
  closeMenu()
  closeDropdowns()
});

/* for (i = 0; i < arrow.length; i++) {
     arrow[i].addEventListener("click", function () {
          this.classList.toggle("arrow-open");
     })
}; */

hamburger.addEventListener("click", tester);


// Slideshow 
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/* var slideIndex = 0;

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

showSlides(); */






