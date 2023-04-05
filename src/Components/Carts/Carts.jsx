import React from "react";
import "./Cart.css";

const Carts = ({Cart,children}) => {
    let totalPrice = 0;
    let totalShipping = 0;
    let Totalquantity = 0; 
    for(const product of Cart){

        totalPrice += product.price * product.quantity;
        totalShipping += product.shipping * product.quantity;
        Totalquantity+= product.quantity;

    }

    
const totalTax = totalPrice*7/100;
const grandTotao = totalPrice + totalShipping + totalTax;

  return (
    <div>
      <h5 className="order-title">Order Summary</h5>
      <div className="cart-content">
        <p>Selected Items: ${Totalquantity}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Total Shipping Charge: ${totalShipping}</p>
        <p>Tax: ${totalTax.toFixed(2)}</p>
        <h2 className="grand-total">Grand Total: ${grandTotao.toFixed(2)}</h2>
      </div>
      {
        children
      }
    </div>
  );
};

export default Carts;
