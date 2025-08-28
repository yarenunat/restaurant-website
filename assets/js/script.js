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











