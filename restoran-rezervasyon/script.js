document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const peopleCount = document.getElementById("people_count").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    fetch("http://localhost:3000/reserve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            people_count: peopleCount,
            date: date,
            time: time
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
    })
    .catch(error => {
        document.getElementById("message").innerText = "Hata oluştu!";
    });
});

// Yeni: Rezervasyonları Listeleme
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const searchName = document.getElementById("searchName").value;

    fetch(`http://localhost:3000/reservations/${searchName}`)
        .then(response => response.json())
        .then(data => {
            const reservationsList = document.getElementById("reservationsList");
            reservationsList.innerHTML = "";
            if (data.reservations && data.reservations.length > 0) {
                data.reservations.forEach(reservation => {
                    const div = document.createElement("div");
                    div.innerHTML = `
                        <p>Ad: ${reservation.name}, Kişi Sayısı: ${reservation.people_count}, Tarih: ${reservation.date}, Saat: ${reservation.time} 
                        <button onclick="cancelReservation(${reservation.id})">İptal Et</button></p>
                    `;
                    reservationsList.appendChild(div);
                });
            } else {
                reservationsList.innerHTML = "<p>Rezervasyon bulunamadı.</p>";
            }
        })
        .catch(error => {
            document.getElementById("reservationsList").innerHTML = "Hata oluştu!";
        });
});

// Rezervasyonu İptal Etme
function cancelReservation(reservationId) {
    fetch(`http://localhost:3000/reservation/${reservationId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Rezervasyon listesinde iptal edilen kaydı güncelle
        document.getElementById("searchForm").submit(); // Yeniden listele
    })
    .catch(error => {
        alert("İptal işlemi sırasında hata oluştu.");
    });
}



//////////
'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});






let isImageWide = false;
function imgHandler(bg, nm) {
  var i13 = document.querySelector('.i13')
  var img1 = document.getElementById('img1')
  var ti = document.getElementById('nm')
  let tc = gsap.timeline()
  tc.to(ti, {
    opacity: 0
  })
  tc.to(ti, {
    innerHTML: nm,
    delay: 0.2
  })
  tc.to(ti, {
    opacity: 1
  })
  if (isImageWide == false) {
    img1.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
    img1.style.backgroundImage = `url(${bg})`
    isImageWide = true
  } else {
    img1.style.clipPath = 'polygon(0 0, 0% 0, 0% 100%, 0 100%)'
    i13.style.backgroundImage = `url(${bg})`
    isImageWide = false
  }
}

