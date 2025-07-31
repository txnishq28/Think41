const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db');

fs.createReadStream('data/products.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.get(`SELECT id FROM departments WHERE name = ?`, [row.department], (err, department) => {
      if (err) {
        console.error(err.message);
        return;
      }
      if (!department) {
        console.error(`Department ${row.department} not found!`);
        return;
      }

      db.run(
        `INSERT INTO products (name, description, price, stock, category, department_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          row.name,
          row.description,
          parseFloat(row.price),
          parseInt(row.stock),
          row.category,
          department.id
        ],
        (err) => {
          if (err) console.error(err.message);
        }
      );
    });
  })
  .on('end', () => {
    console.log('✅ CSV data loaded.');
    db.close();
  });
