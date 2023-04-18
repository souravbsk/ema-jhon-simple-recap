import React, { useState } from "react";
import "./OrderReview.css";
import Carts from "../Carts/Carts";
import { Link, useLoaderData } from "react-router-dom";
import OrderItem from "../OrderItem/OrderItem";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FaCreditCard, FaTrashAlt } from "react-icons/fa";

const OrderReview = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleRemoveItem = (id) => {
    const restProduct = cart.filter((product) => product.id !== id);
    setCart(restProduct);
    removeFromDb(id);
  };

  const handleEmptyCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="order-container">
      <div className="order-item-container">
        {cart.length === 0 && <h2>No Product Added !!!. Please add some product </h2>}
        {cart.map((product) => (
          <OrderItem
            product={product}
            key={product.id}
            handleRemoveItem={handleRemoveItem}
          ></OrderItem>
        ))}
      </div>
      <div className="order-cart-container">
        <Carts Cart={cart}>
          <div>
            <button onClick={handleEmptyCart} className="review-cart-clear">
              <span>Clear Cart</span> <FaTrashAlt></FaTrashAlt>
            </button>
            <Link to="/checkout" className="btn-link">
              <button className="checkout-review-btn">
                <span>Proceed Checkout</span> <FaCreditCard></FaCreditCard>
              </button>
            </Link>
          </div>
        </Carts>
      </div>
    </div>
  );
};

export default OrderReview;
