import React from "react";
import "./Product.css";
import { FaCartPlus } from "react-icons/fa";
const Product = (props) => {
  const { product, handleAddToCart } = props;
  const { img, name, price, seller, ratings } = product;
  return (
    <div className="product">
      <img className="product-img" src={img} alt="" />
      <div className="product-content">
        <div>
          <h6 className="product-title">{name}</h6>
          <p>Price: ${price}</p>
        </div>
        <div className="product-bottom-content">
          <p>
            <small>Manufacturer: {seller}</small>
          </p>
          <p>
            <small>Rating: {ratings}</small>
          </p>
        </div>
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="add-to-cart-btn"
      >
        Add To Cart <FaCartPlus></FaCartPlus>
      </button>
    </div>
  );
};

export default Product;
