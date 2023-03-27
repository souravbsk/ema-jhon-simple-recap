import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'

const Header = () => {
    return (
        <header>
            <nav className='header'>
                <div className="nav-brand">
                    <img className='nav-brand-logo' src={logo} alt="" />
                </div>
                <ul className="nav-item">
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/order-review">Order Review</a></li>
                    <li><a href="/manage-inventory">Manage Inventory</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;