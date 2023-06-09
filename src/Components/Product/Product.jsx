import React from "react";
import "./Product.css";
import { FaCartPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
const Product = (props) => {
  const { product, handleAddToCart } = props;
  const {_id, img, name, price, seller, ratings } = product;
  const navigate =useNavigate();
  const handleProductView = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className="product">
      <img onClick={() => handleProductView(_id)}  className="product-img" src={img} alt="" />
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
