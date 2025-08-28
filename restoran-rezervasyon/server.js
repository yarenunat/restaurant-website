const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite Veritabanı
const db = new sqlite3.Database("./reservations.db", (err) => {
    if (err) {
        console.error("Veritabanı bağlantı hatası:", err.message);
    } else {
        console.log("SQLite veritabanına bağlandı.");
    }
});

// 📩 **Nodemailer Transporter Ayarları**
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "eminylmz58@gmail.com",
        pass: "wkeh qmhw pzxj pcwg" // Google App Password kullanın
    },
    tls: {
        rejectUnauthorized: false // Bu, güvenli bağlantı için ek bir adım olabilir
    }
});


// 📌 **Rezervasyon Ekleme API'si**
app.post("/reserve", (req, res) => {
    const { name, people_count, date, time } = req.body;
    if (!name || !people_count || !date || !time) {
        return res.status(400).json({ error: "Tüm alanlar gereklidir." });
    }

    const query = `INSERT INTO reservations (name, people_count, date, time) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, people_count, date, time], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // 📩 **E-posta Gönderme İşlemi**
        const mailOptions = {
            from: "eminylmz58@gmail.com",  // 📌 Buraya kendi e-postanızı yazın
            to: "eminylmz58@gmail.com",    // 📌 RESTORAN e-posta adresi burası!
            subject: "Yeni Restoran Rezervasyonu",
            text: `📢 Yeni Rezervasyon Detayları:\n\n👤 Ad: ${name}\n👥 Kişi Sayısı: ${people_count}\n📅 Tarih: ${date}\n🕒 Saat: ${time}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("❌ E-posta gönderme hatası:", error);
                return res.status(500).json({ error: "E-posta gönderilemedi!" });
            } else {
                console.log("✅ E-posta başarıyla gönderildi:", info.response);
                return res.json({ message: "Rezervasyon tamamlandı ve e-posta gönderildi!" });
            }
        });
    });
});

// 📌 **Rezervasyonları Listeleme API'si (Ad ile)**
app.get("/reservations/:name", (req, res) => {
    const name = req.params.name;
    const query = `SELECT * FROM reservations WHERE name = ?`;

    db.all(query, [name], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ reservations: rows });
    });
});

// 📌 **Rezervasyon İptali API'si**
app.delete("/reservation/:id", (req, res) => {
    const { id } = req.params;

    // Rezervasyonu veritabanından sil
    const query = `SELECT * FROM reservations WHERE id = ?`;

    db.get(query, [id], (err, reservation) => {
        if (err || !reservation) {
            return res.status(500).json({ error: "Rezervasyon bulunamadı." });
        }

        // İptal edilen rezervasyonu sil
        const deleteQuery = `DELETE FROM reservations WHERE id = ?`;
        db.run(deleteQuery, [id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // 📩 **İptal E-postası Gönderme İşlemi**
            const mailOptions = {
                from: "eminylmztr58@gmail.com",  // 📌 Buraya kendi e-postanızı yazın
                to: "eminylmz58@gmail.com",    // 📌 RESTORAN e-posta adresi burası!
                subject: "Restoran Rezervasyonu İptal Edildi",
                text: `📢 Rezervasyon İptal Edildi:\n\n👤 Ad: ${reservation.name}\n👥 Kişi Sayısı: ${reservation.people_count}\n📅 Tarih: ${reservation.date}\n🕒 Saat: ${reservation.time}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("❌ İptal E-posta gönderme hatası:", error);
                    return res.status(500).json({ error: "İptal e-posta gönderilemedi!" });
                } else {
                    console.log("✅ İptal E-posta başarıyla gönderildi:", info.response);
                    return res.json({ message: "Rezervasyon iptal edildi ve e-posta gönderildi." });
                }
            });
        });
    });
});

// 📌 **Sunucuyu Başlat**
app.listen(port, () => {
    console.log(`🚀 Sunucu ${port} numaralı portta çalışıyor.`);
});
