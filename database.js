const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('products.db'); // Используем файл базы данных

// Создание таблицы товаров, если она не существует
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Артикул TEXT,
        Бренд TEXT,
        Наименование TEXT,
        Количество INTEGER,
        Цена REAL
    )`);

    // Вставка данных в таблицу, если таблица пуста
    db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }
        if (row.count === 0) {
            const stmt = db.prepare(`INSERT INTO products (Артикул, Бренд, Наименование, Количество, Цена) VALUES (?, ?, ?, ?, ?)`);
            stmt.run('12345', 'Brand A', 'Product A', 10, 100);
            stmt.run('67890', 'Brand B', 'Product B', 5, 200);
            stmt.run('54321', 'Brand C', 'Product C', 20, 150);
            stmt.finalize();
        }
    });
});

module.exports = db;