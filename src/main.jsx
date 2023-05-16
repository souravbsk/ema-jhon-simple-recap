import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./layout/Home";
import Shop from "./Components/Shop/Shop";
import OrderReview from "./Components/OrderReview/OrderReview";
import orderDataFromCart from "./loader/oderDataFromCart";
import Checkout from "./Components/Checkout/Checkout";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProductDetailsDataLoad from "./utilities/ProductDetailsDataLoad";
import AuthProvider from "./AuthProvider/AuthProvider";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader:() => fetch('http://localhost:5000/totalProducts')
      },
      {
        path: "/product/:productId",
        element: <ProductDetails></ProductDetails>,
        loader: ProductDetailsDataLoad,
      },
      {
        path: "/review",
        element: <OrderReview></OrderReview>,
        loader: orderDataFromCart,
      },
      {
        path: "/checkout",
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/Signup",
        element:<Register></Register>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
  // </React.StrictMode>,
);
