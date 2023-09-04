import * as React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Products from "./components/Products"
import Cart from "./components/Cart"




const router = createBrowserRouter([
  {
    path: "/createUser",
    element:<Signup/>,
  },
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/signin",
    element: <Login/>
  },

  {
    path: "/products",
    element: <Products/>
  },

  {
    path: "/cart",
    element: <Cart/>
  }


]);


export default router;