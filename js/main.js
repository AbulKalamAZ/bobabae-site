// When the user scrolls the page myFunction() fires
window.onscroll = function() {myFunction()};

// Getting DOM elements
const navbar = document.querySelector(".header-section");
const hero = document.querySelector(".hero-section");
const stt_btn = document.querySelector(".stt-btn");
const burger_menu = document.querySelector(".burger-menu");
const off_canvas_menu = document.querySelector(".off-canvas-menu");
const close = document.querySelector(".close-off-canvas");
const navLinkOffCanvas = document.querySelectorAll(".off-canvas-menu li");

const read_more_btns = document.querySelectorAll('.show-more');
const dots = document.querySelectorAll('.dots');
const invisible_texts = document.querySelectorAll('.invisible-text');



// Get the offset position of the navbar
const sticky = navbar.offsetTop;

// Function that fires when user scrolls => toggle stt_btn & navbar's style
function myFunction() {

  if (window.scrollY >= 150) {
    navbar.classList.add("bg-opacity-75");
  } else {
    navbar.classList.remove("bg-opacity-75");
  }

  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    stt_btn.classList.remove('d-none');
    stt_btn.classList.add('d-flex');
    
  } else {
    stt_btn.classList.add('d-none');
    stt_btn.classList.remove('d-flex');
  }
}

// Scroll to top button's functionality
stt_btn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

// Burger menu's functionality
burger_menu.addEventListener('click', () => {
    off_canvas_menu.classList.toggle('shown')
})

// Close button's functionality
close.addEventListener('click', () => {
    off_canvas_menu.classList.toggle('shown')
})

// Nav link on offcanvas's functionality
navLinkOffCanvas.forEach(item => {
    item.addEventListener('click', () => {
        off_canvas_menu.classList.toggle('shown')
    })
})

// Read more button's functionality
read_more_btns.forEach(item => {
  item.addEventListener('click', () => {
    let item_number = item.getAttribute('data-serial');

    dots[item_number - 1].classList.toggle('hidden');
    invisible_texts[item_number - 1].classList.toggle('shown');

    if(item.textContent === 'Show more') {
      item.textContent = 'Show less';
    } else {
      item.textContent = 'Show more';
    }
  })
})


// Function that renders gallery-card
function renderGalleryCard(imageSrc) {

  // Create the necessary elements
  var galleryCard = document.createElement('div');
  galleryCard.className = 'gallery-card swiper-slide';

  var image = document.createElement('img');
  image.src = imageSrc;
  // image.width = '250';
  image.alt = 'gallery-card-insta-img';

  // Append the image to the gallery card
  galleryCard.appendChild(image);

  // Append the gallery card to the swiper wrapper
  document.getElementById('insta-feed').appendChild(galleryCard);
}


// Instagram feed
fetch('https://graph.instagram.com/me/media?fields=media_type,media_url&access_token=IGQWRPV2FnSUlBQ3MyVkdpTXA4dzNZAbGh5VEx1WWoydGFDMlJlVDlMbjRHQzFhaDVvRU8zN3NpOWpVanAzdEtzU3hEczBBSEdmZAHdtOWlMOGlMbXI5MEVhRTAtdmktYW1sRThJWS04U0RvQ0ZASNkhndkMtZAFZAucmsZD').then(res => res.json()).then(res_data => {
  const { data } = res_data;
  const display_data = [ ...data.filter(item => item.media_type === 'IMAGE')];

  display_data.forEach(item => {
    renderGalleryCard(item.media_url);
  })

  return true;

}).then(res => {

  // Initialing swiper
  var insta_gallery_swiper = new Swiper(".gallerySwiper", {
    speed: 750,
    autoplay: {
      delay: 1200
    },
    loop: true,
    loopSlides: 12,
    breakpoints: {
      375: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1440: {
        slidesPerView: 5,
        spaceBetween: 30
      }
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true
    },
  });
})
