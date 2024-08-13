const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`on port ${process.env.PORT || 3000}`);
});

app.get('/', async (req, res) => {
    res.send('<h1>Hello Daler</h1>');
});