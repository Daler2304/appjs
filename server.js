const express = require('express');
const path = require('path');
const app = express();

// Основная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/index.html'));
});

// Страница администратора
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/admin.html'));
});

app.get('/timetable', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/timetable.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
