const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "templates")));
app.use(express.static(path.join(__dirname, "static")));

app.get("/yandex_e83b9e40bfb17547.html", (req, res) => {
    res.sendFile(path.join(__dirname, "yandex_e83b9e40bfb17547.html"));
});

app.get("/lang.json", (req, res) => {
    res.sendFile(path.join(__dirname, "lang.json"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "admin.html"));
});

app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "privacy-policy.html"));
});

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Use the environment variable
        pass: process.env.EMAIL_PASS,   // Use the environment variable
    },
});

app.post("/submit-form", (req, res) => {
    const { name, email, message } = req.body;

    console.log("Данные формы получены:", { name, email, message });

    let mailOptions = {
        from: "Sirozhidinov.DK.267@suitd.ru",
        to: email,
        subject: "Ответ на ваш вопрос",
        html: `
            <h1>Спасибо за ваше сообщение!</h1>
            <p>Уважаемый(ая) <strong>Daler</strong>,</p>
            <p>Мы получили ваш запрос и свяжемся с вами в ближайшее время.</p>
            <p>С уважением,<br>Администрация сайта</p>
            <hr>
            <footer style="font-size: 12px; color: #777;">
                Это письмо сгенерировано автоматически, пожалуйста, не отвечайте на него.
            </footer>
        `,
    };

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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
