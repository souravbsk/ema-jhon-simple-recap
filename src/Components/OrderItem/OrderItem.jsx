import React from "react";
import "./OrderItem.css";
import { FaTrashAlt } from "react-icons/fa";

const OrderItem = ({ product, handleRemoveItem }) => {
  const { id, name, img, price, quantity } = product;
  return (
    <div className="order-product">
      <img className="order-img" src={img} alt="" />
      <div className="orderProduct-content">
        <h6 className="orderProduct-title">{name}</h6>
        <p>
          Price: <span>${price}</span>
        </p>
        <p>
          Quantity: <span>{quantity}</span>
        </p>
      </div>
      <button onClick={() => handleRemoveItem(id)} className="order-remove-btn">
        <FaTrashAlt className="remove-icon"></FaTrashAlt>
      </button>
    </div>
  );
};

export default OrderItem;
