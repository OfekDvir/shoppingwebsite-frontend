import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import CartIconWithCount from './CartIconWithCount';
import '../App.css';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="menu">
            {/* כפתור המבורגר */}
            <div className="mobile-toggle" onClick={toggleMenu}>
                ☰
            </div>

            {/* תפריט ניווט */}
            <div className={`menu-content ${menuOpen ? 'open' : ''}`}>
                <div>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    {/* <Link to="/users" onClick={() => setMenuOpen(false)}>Users</Link> */}
                    <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
                    <Link to="/favorites">💖 המועדפים שלי</Link>
                    {/* <Link to="/order-summary">📦 סיכום הזמנה</Link> */}
                    <Link to="/orders">📦 ההזמנות שלי</Link>



                    {!currentUser && <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>}
                    {!currentUser && <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>}

                    {currentUser?.role === 'ADMIN' && <Link to="/add-product" onClick={() => setMenuOpen(false)}>Add Product</Link>}
                    {currentUser && <Link to="/cart" onClick={() => setMenuOpen(false)}>Shopping Cart 🛒</Link>}
                </div>

                <div className="right-actions">
                    <CartIconWithCount />

                    {/* {currentUser?.role === 'ADMIN' && (
                        <button className="admin-button" onClick={() => { setMenuOpen(false); window.location.href = '/admin'; }}>
                            Go to Admin Panel
                        </button>
                    )} */}

                    {currentUser ? (
                        <div className="user-controls">
                            <Link to="/accountSettings" onClick={() => setMenuOpen(false)} className="account-link">
                                Account Settings
                            </Link>
                            <span className="greeting">שלום, {currentUser.firstName}</span>
                            <button className="logout-button" onClick={() => { setMenuOpen(false); logout(); }}>
                                Logout
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
