const express = require("express");
const path = require("path");

const app = express();
const PORT = 80;

// Раздача статических файлов
app.use(express.static(path.join(__dirname, "templates")));
app.use(express.static(path.join(__dirname, "static")));

// Раздача yandex_e83b9e40bfb17547.html
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

// Маршрут для страницы политики обработки персональных данных
app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "privacy-policy.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
