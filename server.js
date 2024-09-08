const express = require('express');
const path = require('path');
const app = express();

// Middleware для определения поддомена
app.use((req, res, next) => {
    const host = req.hostname.split('.');
    const subdomain = host.length > 2 ? host[0] : null;

    if (subdomain === 'timetable') {
        // Если поддомен "timetable", возвращаем специальную страницу
        res.sendFile(path.join(__dirname, 'public/templates/timetable.html'));
    } else {
        next();
    }
});

// Основная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/index.html'));
});

// Страница администратора
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/admin.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
