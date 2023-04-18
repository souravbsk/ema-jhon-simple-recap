import React, { useState } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { authProvider } from "../../AuthProvider/AuthProvider";
import { FaSignOutAlt } from "react-icons/fa";



const Header = () => {
    const [isActive,setActive] = useState(false);
    const {user,logOut} = useContext(authProvider);
    const handleLogOut =() => {
      logOut()
      .then(res => {
        console.log('logout success');
      })
      .catch(err => {
        console.log(err.message);
      })
    }
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
          {
            user ? <li><span className="user-mail">Welcome, {user?.email.slice(0,9)}</span> <button onClick={handleLogOut} className="signOut-btn">Sign Out<FaSignOutAlt></FaSignOutAlt></button></li>:
            <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          }
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
