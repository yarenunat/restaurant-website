<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ad = htmlspecialchars($_POST['ad']);
    $email = htmlspecialchars($_POST['email']);
    $konu = htmlspecialchars($_POST['konu']);
    $mesaj = htmlspecialchars($_POST['mesaj']);

    $mail = new PHPMailer(true);

    try {
        // Sunucu ayarları
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'eminylmz58@gmail.com';
        $mail->Password = 'wkeh qmhw pzxj pcwg';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Alıcı ve içerik
        $mail->setFrom($email, $ad);
        $mail->addAddress('eminylmz58@gmail.com');
        $mail->Subject = "Lokantadan yeni ileti: $konu";
        $mail->Body = "Ad: $ad\nE-posta: $email\n\nMesaj:\n$mesaj";

        $mail->send();
        
        echo json_encode(['status' => 'success', 'message' => 'Mesajınız başarıyla gönderildi. Teşekkür ederiz!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Mesaj gönderilemedi. Hata: '.$mail->ErrorInfo]);
    }
    exit;
}
?>