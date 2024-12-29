import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';
import logo from "../Images/freshcart-logo.svg";

export default function Nav() {
  const { userToken, setUserToken } = useContext(UserContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <nav className="bg-gray-200 p-2 shadow-md w-full">
      <div className="container py-4 flex items-center">
        {/* Left Side: Logo */}
        <Link className="flex items-center" to="/">
          <img src={logo} alt="Logo" className="w-32" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700 text-2xl ml-auto"
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Center: Navbar Items (Desktop View) */}
        <div className="hidden lg:flex space-x-6 ml-4">
          {userToken !== null && (
            <>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/">Home</Link>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/cart">Cart</Link>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/products">Products</Link>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/categories">Categories</Link>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/brands">Brands</Link>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/wishlist">Wish List</Link>
            </>
          )}
        </div>

        {/* Right Side: Icons and Login/Logout */}
        <div className="flex ml-auto items-center space-x-4">
          <div className="hidden lg:flex space-x-2">
            <i className="fab fa-facebook text-xl text-gray-700 hover:text-blue-600"></i>
            <i className="fab fa-instagram text-xl text-gray-700 hover:text-pink-500"></i>
            <i className="fab fa-twitter text-xl text-gray-700 hover:text-blue-400"></i>
            <i className="fab fa-tiktok text-xl text-gray-700 hover:text-black"></i>
            <i className="fab fa-youtube text-xl text-gray-700 hover:text-red-600"></i>
          </div>

          {userToken !== null ? (
            <>
              <div className="relative">
                <Link className="text-lg text-gray-700 hover:text-gray-900 relative" to="/cart">
                  <i className="fas fa-cart-shopping text-2xl"></i>
                  <span className="absolute top-0 right-0 text-sm text-white bg-red-500 rounded-full px-2">{cartCount}</span>
                </Link>
              </div>
              <button className="text-lg text-gray-700 hover:text-gray-900" onClick={logOut}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/login">Login</Link>
              <Link className="text-lg text-gray-700 hover:text-gray-900" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4 space-y-2`}>
        {userToken !== null && (
          <>
            <Link className="block text-lg text-gray-700 hover:text-gray-900" to="/">Home</Link>
            <Link className="block text-lg text-gray-700 hover:text-gray-900" to="/cart">Cart</Link>
            <Link className="block text-lg text-gray-700 hover:text-gray-900" to="/products">Products</Link>
            <Link className="block text-lg text-gray-700 hover:text-gray-900" to="/categories">Categories</Link>
            <Link className="block text-lg text-gray-700 hover:text-gray-900" to="/brands">Brands</Link>
            <Link className="block text-lg text-gray-700 hover:text-gray-900" to="/wishlist">Wish List</Link>
          </>
        )}
      </div>
    </nav>
  );
}
