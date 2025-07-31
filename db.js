const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);


  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER NOT NULL,
      category TEXT,
      department_id INTEGER,
      FOREIGN KEY (department_id) REFERENCES departments(id)
    )
  `);

  db.run(`INSERT OR IGNORE INTO departments (name) VALUES ('Clothing')`);
  db.run(`INSERT OR IGNORE INTO departments (name) VALUES ('Electronics')`);
  db.run(`INSERT OR IGNORE INTO departments (name) VALUES ('Home')`);

  console.log('✅ Database ready!');
});

module.exports = db;
