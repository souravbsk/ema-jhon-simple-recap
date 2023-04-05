import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './layout/Home'
import Shop from './Components/Shop/Shop'
import OrderReview from './Components/OrderReview/OrderReview'
import orderDataFromCart from './loader/oderDataFromCart'
import Checkout from './Components/Checkout/Checkout'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>,
    children:[
      {
        path:"/",
        element:<Shop></Shop>,
      },
      {
        path:"/review",
        element:<OrderReview></OrderReview>,
        loader:orderDataFromCart
        
      },
      {
        path:"/checkout",
        element:<Checkout></Checkout>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
