import React, { useEffect, useState } from 'react'

const ProductList = () => {
    const[products , setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data.products);
        })
        .catch(err => console.error(err));
    } , []);
  return (
    <div>
        <h1>All Products</h1>
        <ul>
            {products.map(p => (
                <li key={p.id}>{p.name} = ${p.price}</li>
            ))}
        </ul>
    </div>
  )
}

export default ProductList