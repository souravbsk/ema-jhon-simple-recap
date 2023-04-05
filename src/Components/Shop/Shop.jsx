import React, { useEffect, useState } from "react";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import ProductDataLoad from "../../utilities/ProductDataLoad";
import Carts from "../Carts/Carts";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = ProductDataLoad();

  const [Cart, setCart] = useState([]);

  // quantity update
  useEffect(() => {
    // get product item from localStorage
    const storedCart = getShoppingCart();
    const saveCart = []; //store the update quantity product object

    for (const id in storedCart) {
      // after get date lets run a for in for take each item
      const addedCart = products.find((pd) => pd.id === id); //find same data
      if (addedCart) {
        const quantity = storedCart[id]; //get quantity from local storage value
        addedCart["quantity"] = quantity; // set the quantity from addedCart;
        saveCart.push(addedCart); //push to store update quantity object in saveCart array;
      }
    }

    setCart(saveCart); //after loop operation end then update Cart State with pass the saveCart array in setCart function
  }, [products]);

  const handleAddToCart = (product) => {
    // const updateCart = [...Cart, product];
    let newCart = [];

    const exist = Cart.find((pd) => pd.id === product.id);
    if (exist) {
      product.quantity += 1;
      const restProduct = Cart.filter((pd) => pd.id !== product.id);
      newCart = [...restProduct, product];
    } else {
      product.quantity = 1;
      newCart = [...Cart, product];
    }
    setCart(newCart);
    addToDb(product.id);
  };


const handleEmptyCart = () => {
  setCart([])
  deleteShoppingCart()
}

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
        <Carts Cart={Cart}>
          <div className="shop-order-btn">
              <button onClick={handleEmptyCart} className="shopOrder-clear-btn">
                <span>Clear Cart</span> <FaTrashAlt></FaTrashAlt>
              </button>
            <Link to="/review" className="btn-link">
              <button className="shopOrder-review-btn">
                <span>Review Order</span> <FaArrowRight></FaArrowRight>
              </button>
            </Link>
          </div>
        </Carts>
      </div>
    </div>
  );
};

export default Shop;
