const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); // Для обработки данных формы
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware для парсинга данных формы (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Раздача статических файлов
app.use(express.static(path.join(__dirname, "templates")));
app.use(express.static(path.join(__dirname, "static")));

// Маршрут для раздачи yandex_e83b9e40bfb17547.html
app.get("/yandex_e83b9e40bfb17547.html", (req, res) => {
    res.sendFile(path.join(__dirname, "yandex_e83b9e40bfb17547.html"));
});

// Маршрут для раздачи lang.json
app.get("/lang.json", (req, res) => {
    res.sendFile(path.join(__dirname, "lang.json"));
});

// Маршруты для HTML страниц
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "admin.html"));
});

app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "privacy-policy.html"));
});

// Маршрут для обработки данных формы
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // SMTP сервер Outlook
    port: 587, // Порт для TLS
    secure: false, // Указываем false для использования TLS
    auth: {
        user: "email", // Ваш полный адрес электронной почты
        pass: "pass", // Ваш пароль от почты Outlook
    },
});

// Маршрут для обработки данных формы
app.post("/submit-form", (req, res) => {
    const { name, email, message } = req.body;

    console.log("Данные формы получены:", { name, email, message });

    // Формируем письмо, которое отправим пользователю
    let mailOptions = {
        from: "Sirozhidinov.DK.267@suitd.ru", // Отправитель
        to: email, // Получатель
        subject: "Ответ на ваш вопрос", // Тема письма
        html: `
            <h1>Спасибо за ваше сообщение!</h1>
            <p>Уважаемый(ая) <strong>Daler</strong>,</p>
            <p>Мы получили ваш запрос и свяжемся с вами в ближайшее время.</p>
            <p>С уважением,<br>Администрация сайта</p>
            <hr>
            <footer style="font-size: 12px; color: #777;">
                Это письмо сгенерировано автоматически, пожалуйста, не отвечайте на него.
            </footer>
        `, // HTML разметка письма
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Ошибка при отправке письма:", error);
        }
        console.log("Письмо отправлено: %s", info.messageId);
    });

    // Отправляем письмо
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Ошибка при отправке письма:", error);
            return res.status(500).send("Ошибка отправки письма.");
        } else {
            console.log("Письмо успешно отправлено:", info.response);
            return res.send("Форма успешно отправлена!");
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
