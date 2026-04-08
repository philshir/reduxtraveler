

const hamburger = document.querySelector('.container')
const slider = document.querySelector(".slider")
const newOverlay = document.querySelector(".start")
const arrow = document.getElementsByClassName("fa-caret-down")

const tester = () => {
     slider.classList.toggle("move");
     newOverlay.classList.toggle("overlay");
     hamburger.classList.toggle("change");
}

// Detect all clicks on the document
document.addEventListener("click", function(event) {
	// If user clicks inside the element, do nothing
	if (event.target.closest(".slider") || event.target.closest(".container")) return;

	// If user clicks outside the element, hide it!
  slider.classList.remove("move")
  hamburger.classList.remove("change")
  newOverlay.classList.remove("overlay")
});

const dropdown = document.getElementsByClassName("dropdown-btn");
let i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
       this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}

/* for (i = 0; i < arrow.length; i++) {
     arrow[i].addEventListener("click", function () {
          this.classList.toggle("arrow-open");
     })
}; */

hamburger.addEventListener("click", tester);

/* 
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
} */

// itinerary accordion

 const items = document.querySelectorAll('.accordion-item');

items.forEach(item => {
  const header = item.querySelector('.header');

  header.addEventListener('click', () => {
    items.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });

    item.classList.toggle('active');
  });
});

// read more
// const containerRead = document.querySelector('.read-more-container');
// const textWrapper = document.getElementById('textWrapper');
// const toggleBtn = document.getElementById('toggleBtn');
// const labelNew = toggleBtn.querySelector('.label-read');

// let isExpanded = false;

// toggleBtn.addEventListener('click', () => {
//   isExpanded = !isExpanded;

//   if (isExpanded) {
//     textWrapper.style.maxHeight = textWrapper.scrollHeight + 'px';
//     labelNew.textContent = 'Read less';
//     containerRead.classList.add('expanded');
//   } else {
//     textWrapper.style.maxHeight = '72px';
//     labelNew.textContent = 'Read more';
//     containerRead.classList.remove('expanded');
//   }
// });




document.querySelectorAll('.read-more-container').forEach(container => {
  const textWrapper = container.querySelector('.text-wrapper');
  const toggleBtn = container.querySelector('.toggle-btn');
  const label = toggleBtn.querySelector('.label-read');

  let isExpanded = false;

  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;

    if (isExpanded) {
      textWrapper.style.maxHeight = textWrapper.scrollHeight + 'px';
      label.textContent = 'Read less';
      container.classList.add('expanded');
    } else {
      textWrapper.style.maxHeight = '72px';
      label.textContent = 'Read more';
      container.classList.remove('expanded');
    }
  });
});
