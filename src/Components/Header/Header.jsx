import React, { useState } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


const Header = () => {
    const [isActive,setActive] = useState(false);
  return (
    <header>
      <nav className="header">
        <div className="nav-brand">
          <img className="nav-brand-logo" src={logo} alt="" />

          <button onClick={() => setActive(!isActive)} className="nav-bar">
            {isActive ?  <IoClose></IoClose> : <FaBars></FaBars>}
          </button>
        </div>
        <ul className={`nav-item ${isActive && "navActive"}`}>
          <li>
            <NavLink to="/">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/review">Order Review</NavLink>
          </li>
          <li>
            <NavLink to="/manage-inventory">Manage Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
