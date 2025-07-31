const express = require('express');
const cors = require('cors'); // ✅ Import CORS
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors()); // ✅ Enable CORS for all origins
app.use(express.json());

// Get all products
app.get('/api/products', (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ products: rows });
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ product: row });
  });
});

// Get all departments
app.get('/api/departments', (req, res) => {
  db.all(`SELECT * FROM departments`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ departments: rows });
  });
});

// Get products by department ID
app.get('/api/departments/:id/products', (req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM products WHERE department_id = ?`, [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ products: rows });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening at http://localhost:${PORT}`);
});
