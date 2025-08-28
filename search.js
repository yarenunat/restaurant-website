function canliAramaYap() {
        const input = document.getElementById("aramaInput");
        const filtre = input.value.toLowerCase();
        const sonucListesi = document.getElementById("aramaSonuclari");

        const icerikler = [
            {ad: "Anasayfa", link: "index.html"},
            {ad: "Hakkımızda", link: "about.html"},
            {ad: "Menü", link: "menu.html"},
            {ad: "Rezervasyon", link: "reservation.html"},
            {ad: "İletişim", link: "contact.html"},
            {ad: "El Menüsü", link: "el-menusu.html"},
            {ad: "Keşfet", link: "kesfet.html"}
        ];

        sonucListesi.innerHTML = "";

        if (filtre.length < 1) {
            sonucListesi.style.display = "none";
            return;
        }

        const bulunanlar = icerikler.filter(item =>
            item.ad.toLowerCase().includes(filtre)
        );

        if (bulunanlar.length === 0) {
            sonucListesi.style.display = "none";
            return;
        }

        bulunanlar.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.ad;
            li.onclick = () => window.location.href = item.link;
            sonucListesi.appendChild(li);
        });

        sonucListesi.style.display = "block";
    }