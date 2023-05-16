import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import ProductDataLoad from "../../utilities/ProductDataLoad";
import Carts from "../Carts/Carts";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [Cart, setCart] = useState([]);
  // useEffect(()=> {
  //     fetch('https://ema-jhon-simple-server-recap.vercel.app/products')
  //     .then(res => res.json())
  //     .then(data => setProducts(data))
  // },[])

  //pagination -------------------------------------------------------------------------------
  const { totalProducts } = useLoaderData(); // 1.total number of data
  const [currentPage, setCurrentPage] = useState(0); //5 current page number
  const [itemsPerPage, seItemsPerPage] = useState(10); //2.todo per page product show
  const totalPages = Math.ceil(totalProducts / itemsPerPage); //3. calculate total page .

  const pageNumbers = [...Array(totalPages).keys()]; //4. create button for pagination

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://ema-jhon-simple-server-recap.vercel.app/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await res.json();
      setProducts(data);
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  // alternative ______________
  // const pageNumbers = [];
  // for(let i = 1; i<= totalPages; i++){
  //   pageNumbers.push(i)
  // }

  //pagination -------------------------------------------------------------------------------

  // ___________________________________________________________ infinity loader----------------------------
  //   const [page,setPage] = useState(3);
  //  const  handleInfiniteScroll = async () => {
  //   // console.log(window.innerHeight); 646
  //   // 1290
  //   // console.log(document.documentElement.scrollTop); 644.799
  //   const totalHeight = window.innerHeight + document.documentElement.scrollTop;
  //   try {
  //     if(parseInt(totalHeight) < (document.documentElement.scrollHeight)){
  //     }
  //     else{
  //       setPage(prev => prev + 3);
  //     }

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //  }
  //  console.log(page);

  // useEffect(() => {
  //   window.addEventListener('scroll',handleInfiniteScroll)
  // },[])

  // ___________________________________________________________ infinity loader----------------------------

  // quantity update
  useEffect(() => {
    // get product item from localStorage
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch('https://ema-jhon-simple-server-recap.vercel.app/productById',{
      method:"POST",
      headers:{
          'content-type':'application/json'
      },
      body:JSON.stringify(ids)
  
  })
  .then(res => res.json())
  .then(datas => {
    const saveCart = []; //store the update quantity product object

    for (const id in storedCart) {
      // after get date lets run a for in for take each item
      const addedCart = datas.find((pd) => pd._id === id); //find same data
      if (addedCart) {
        const quantity = storedCart[id]; //get quantity from local storage value
        addedCart["quantity"] = quantity; // set the quantity from addedCart;
        saveCart.push(addedCart); //push to store update quantity object in saveCart array;
      }
    }

    setCart(saveCart); //after loop operation end then update Cart State with pass the saveCart array in setCart function

  })

   
  }, [products]);

  const handleAddToCart = (product) => {
    // const updateCart = [...Cart, product];
    let newCart = [];
    const exist = Cart.find((pd) => pd.id === product._id);
    if (exist) {
      product.quantity += 1;
      const restProduct = Cart.filter((pd) => pd.id !== product_.id);
      newCart = [...restProduct, product];
    } else {
      product.quantity = 1;
      newCart = [...Cart, product];
    }
    setCart(newCart);
    addToDb(product._id);
  };

  const handleEmptyCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 20];

  //pagination dynamic select
  const handleSelectChange = (e) => {
    seItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div className="shopping-container">
      <div>
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product._id}
              handleAddToCart={handleAddToCart}
              product={product}
            ></Product>
          ))}
        </div>
        {/* pagination */}
        <div className="pagination">
          <p>
            current page: {currentPage} and items per page {itemsPerPage}
          </p>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={currentPage === number ? "selected" : ""}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
          <select value={itemsPerPage} onChange={handleSelectChange}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
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
