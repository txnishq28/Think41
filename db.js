// This file handles database Setup

const sqlite3 =require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');

// Lets create tables if the don't exist

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT , 
        name TEXT NOT NULL ,
        description TEXT , 
        price REAL NOT NULL , 
        stock INTEGER NOT NULL , 
        category TEXT
        )
        `);
});

module.exports = db ;