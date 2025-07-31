import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.product));
  }, [id]);

  const getImage = (name) => {
    switch (name.toLowerCase()) {
      case "t-shirt": return "/src/images/tshirt.png";
      case "jean": return "/src/images/jeans.png";
      case "headphones": return "/src/images/headphones.png";
      case "powerbank": return "/src/images/powerbank.png";
      default: return "";
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={getImage(product.name)} alt={product.name} />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <Link to="/">⬅ Back to Products</Link>
    </div>
  );
}
