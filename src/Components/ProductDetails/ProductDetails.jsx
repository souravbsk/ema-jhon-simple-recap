import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { FaShoppingCart, FaStar, FaRegStar, FaCheck } from "react-icons/fa";
import { addToDb } from "../../utilities/fakedb";
import ProductZoom from "../ProductZoom/ProductZoom";

const ProductDetails = () => {
  const productID = useLoaderData();
  const [Cart, setCart] = useState(false);
  const [product, setProduct] = useState({});
  const [ratingStar, setRatingStar] = useState([]);
  const [quantityValue,setQuantityValue] = useState(1);
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((datas) => {
        const targetProduct = datas.find((data) => data.id === productID);
        setProduct(targetProduct);
      });
  }, [productID]);

  const handleSingleProductBuy = (id) => {
    if(quantityValue < 1){
      alert('sorry please add minimum one product ')
      return
    }
    for(let i = 0; i<parseFloat(quantityValue); i++){
      console.log(quantityValue);
      addToDb(id);
    }
    setCart(true);
  };

  const {
    id,
    img,
    name,
    price,
    quantity,
    ratings,
    ratingsCount,
    seller,
    shipping,
    stock,
  } = product;

  const totalTax = (price * 7) / 100;
  const grandTotal = price + shipping + totalTax;

  useEffect(() => {
    const ratingArray = [];

    // ratings calculate
    const subRate = 5 - ratings;
    for (let i = 0; i < ratings; i++) {
      ratingArray.push(<FaStar></FaStar>);
    }
    for (let i = 0; i < subRate; i++) {
      ratingArray.push(<FaRegStar></FaRegStar>);
    }

    setRatingStar(ratingArray);
  }, [ratings]);

  // zoom img

  return (
    <div className="singleProduct">
      <figure className="singleProductImg">
        {img && <ProductZoom img={img}></ProductZoom>}
      </figure>
      <div className="singleProductContent">
        <div>
          <h2>{name}</h2>
          <p>Seller: {seller}</p>
          <p>Shipping: {shipping}</p>
          <p>Stock: {stock}</p>
          <p className="ratings">
            Ratings:
            <span>
              {ratingStar.map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </span>
          </p>
          <p>Ratings Count: {ratingsCount}</p>
          <p>Tax: {totalTax.toFixed(2)}</p>
        </div>
        <div className="singeProductBuy">
          <h6>Price: ${grandTotal.toFixed(2)}</h6>
          <div className="singleProductQuantityAndBtb">
            <div className="singleProductQuantityInput">
              <input onChange={(e) => setQuantityValue(e.target.value)} type="number" defaultValue="1" min="1" max="100" name="" id="" />
            </div>
            <button
              onClick={() => handleSingleProductBuy(id)}
              className="singleProductBuyBtn"
            >
              Add TO Cart
              {Cart ? <FaCheck></FaCheck> : <FaShoppingCart></FaShoppingCart>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
