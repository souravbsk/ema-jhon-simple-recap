import React, { useState } from "react";
import ProductDataLoad from "../../utilities/ProductDataLoad";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = ProductDataLoad();

  const [Cart, setCart] = useState([]);
  const handleAddToCart = (product) => {
    const updateCart = [...Cart, product];
    setCart(updateCart);
  };
console.log(Cart);
  return (
    <div className="shopping-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            handleAddToCart={handleAddToCart}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <h1>Order Summary</h1>
        <p>Total Product:{Cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;
