const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db');
const { error } = require('console');

fs.createReadStream('data/products.csv')
.pipe(csv())
.on('data' , (row) => {
    db.run(
        `INSERT INTO products(name , description , price, stock , category)
        VALUES (? , ?, ?, ? ,?)`,
        [row.name, row.description , parseFloat(row.price) , parseInt(row.stock) , row.category],
        (err) => {
            if(err){
                console.error(err.message);
            }
        }
    );
})
.on('end' , () => {
    console.log('CSV file successfully Loaded into database');
    db.close();
});