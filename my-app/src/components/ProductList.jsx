import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));

    fetch("http://localhost:5000/api/departments")
      .then(res => res.json())
      .then(data => setDepartments(data.departments));
  }, []);

  const filteredProducts = selectedDepartment
    ? products.filter(p => p.department_id === parseInt(selectedDepartment))
    : products;

  const getImage = (name) => {
    switch (name.toLowerCase()) {
      case "t-shirt": return "/src/images/tshirt.png";
      case "jean": return "/src/images/jeans.png";
      case "headphones": return "/src/images/headphones.png";
      case "powerbank": return "/src/images/powerbank.png";
      default: return "";
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <label>Filter by Department: </label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All</option>
          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={getImage(product.name)} alt={product.name} />
            <h3>
              <Link to={`/products/${product.id}`} style={{ color: "#00ffff" }}>
                {product.name} — ₹{product.price}
              </Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
