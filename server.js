const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000 ; 

app.use(express.json());

app.get('/api/products' , (req , res) => {
    db.all(`SELECT * FROM products` , [] , (err , row) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({product:row});
    });
});

app.get('/api/products/:id' , (req ,res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM products WHERE id = ?`, [id] , (err,row) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        if(!row) {
            res.status(404).json({ message: "Product not found"});
            return;
        }
        res.json({ product: row})
    });
});

app.listen(PORT , () => {
    console.log(`Server is Listening at https://localhost:${PORT}`);
})