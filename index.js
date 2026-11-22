

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

// Open/close a submenu (CSS shows a submenu when its button has aria-expanded="true")
const setDropdown = (btn, open) => {
  btn.classList.toggle("active", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
};

const closeDropdowns = () => {
  dropdownBtns.forEach(btn => setDropdown(btn, false));
};

dropdownBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const wasOpen = btn.getAttribute("aria-expanded") === "true";
    // Only one submenu open at a time (accordion on mobile, no overlap on desktop):
    // close them all, then reopen this one unless it was the one already open.
    closeDropdowns();
    setDropdown(btn, !wasOpen);
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

// park overview accordion: headings become toggle buttons below 1170px only.
// At 1170px+ the buttons are removed so the headings are plain text and all panels show.
document.querySelectorAll('.overview-accordion').forEach((accordion, aIndex) => {
  const items = [...accordion.querySelectorAll('.overview-item')];

  const parts = items.map((item, i) => {
    const heading = item.querySelector('.overview-heading');
    const panel = item.querySelector('.overview-panel');
    panel.id = panel.id || `overview-${aIndex}-panel-${i}`;
    return { item, heading, panel, label: heading.innerHTML };
  });

  const setOpen = (part, open) => {
    part.item.classList.toggle('active', open);
    if (part.button) part.button.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  const enable = () => {
    parts.forEach((part, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'overview-toggle';
      button.setAttribute('aria-controls', part.panel.id);
      button.innerHTML = `<span>${part.label}</span><span class="overview-chevron" aria-hidden="true">˄</span>`;
      button.addEventListener('click', () => {
        const wasOpen = part.item.classList.contains('active');
        // only one open at a time
        parts.forEach(p => setOpen(p, false));
        setOpen(part, !wasOpen);
      });
      part.heading.replaceChildren(button);
      part.button = button;
      setOpen(part, i === 0); // first section (Overview) open on load
    });
    accordion.classList.add('is-collapsible');
  };

  const disable = () => {
    accordion.classList.remove('is-collapsible');
    parts.forEach(part => {
      part.heading.innerHTML = part.label;
      part.button = null;
      part.item.classList.remove('active');
    });
  };

  const apply = () => (desktopQuery.matches ? disable() : enable());
  apply();
  desktopQuery.addEventListener('change', apply);
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

// ── Skeleton Loader ──
(function () {
  var loader = document.getElementById('sk-loader');
  if (!loader) return;
  function dismiss() {
    loader.classList.add('sk-fade');
    setTimeout(function () { loader.remove(); }, 380);
  }
  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
  }
}());
