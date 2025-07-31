import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [departments, setDepartments] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data.departments || []));
  }, []);

  useEffect(() => {
    const url = selectedDept
      ? `/api/departments/${selectedDept}/products`
      : '/api/products';

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, [selectedDept]);

  return (
    <div>
      <h1>Products</h1>

      <label>Filter by Department: </label>
      <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>
        <option value="">All</option>
        {departments.map(dep => (
          <option key={dep.id} value={dep.id}>{dep.name}</option>
        ))}
      </select>

      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name} — ₹{p.price}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
