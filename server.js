const express = require('express');
const path = require('path');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 5000;

// Обработка статических файлов
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Новый маршрут для обработки поисковых запросов
app.get('/api/products', (req, res) => {
    const searchQuery = req.query.search.toLowerCase();
    const query = `
        SELECT * FROM products
        WHERE LOWER(SKU) LIKE ? OR
              LOWER(Brand) LIKE ? OR
              LOWER(Name) LIKE ? OR
              LOWER(Quantity) LIKE ? OR
              LOWER(Price) LIKE ?
    `;
    const params = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`];

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});