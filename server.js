const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Раздача статических файлов
app.use(express.static(path.join(__dirname, "templates")));
app.use(express.static(path.join(__dirname, "static")));

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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
