// Sağ tık seslendirme menüsü oluştur
(function () {
    // Menü öğesini oluştur
    const menu = document.createElement("div");
    menu.id = "customContextMenu";
    menu.innerHTML = `<button id="speakBtn">Seslendir</button>`;
    document.body.appendChild(menu);

    // Menü CSS stili
    const style = document.createElement("style");
    style.textContent = `
        #customContextMenu {
            position: absolute;
            display: none;
            background: Black;
            border: 2px solid #e4c590;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 10000;
        }

        #customContextMenu button {
            color: #e4c590;
            display: block;
            width: 150px;
            padding: 8px;
            border: none;
            background: none;
            text-align: left;
            cursor: pointer;
        }

        #customContextMenu button:hover {
            color: #000000;
            background-color: #e4c590;
        }
    `;
    document.head.appendChild(style);

    // Menü konumlandırma
    document.addEventListener('contextmenu', function (e) {
        const selection = window.getSelection().toString().trim();
        if (selection.length > 0) {
            e.preventDefault();
            menu.style.top = e.pageY + 'px';
            menu.style.left = e.pageX + 'px';
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });

    // Menü gizleme
    document.addEventListener('click', function () {
        menu.style.display = 'none';
    });

    // Seslendirme butonu işlevi
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('speakBtn').addEventListener('click', function () {
            const text = window.getSelection().toString().trim();
            if (text.length > 0) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'tr-TR';

                // Türkçe destekli sesi seçmeye çalış
                const voices = window.speechSynthesis.getVoices();
                const turkishVoice = voices.find(v => v.lang === 'tr-TR' || v.name.toLowerCase().includes('turkish'));

                if (turkishVoice) {
                    utterance.voice = turkishVoice;
                } else {
                    alert("Bilgisayarınızda Türkçe ses bulunamadı.");
                }

                window.speechSynthesis.speak(utterance);
            }
            menu.style.display = 'none';
        });
    });

    // Sesler yüklenmeden boş gelirse tekrar çağır
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
            speechSynthesis.getVoices(); // yükle
        };
    }
})();
