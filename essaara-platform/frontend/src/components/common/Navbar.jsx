import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  // Calculate real total number of items currently in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Helper function to check active path highlights
  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white border-b border-neutral-100 sticky top-0 z-40 font-sans text-essaara-earth">
      
      {/* TOP CORE BRAND HEADER LOGO LINE */}
      <div className="w-full px-6 py-5 flex justify-between items-center relative border-b border-neutral-50">
        <div className="w-1/4 hidden lg:block text-left">
          <span className="font-sans text-[10px] tracking-widest uppercase text-neutral-400 font-light">
            Purely Ayurvedic
          </span>
        </div>
        
        {/* Absolute Centered Branding */}
        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 text-center">
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-light text-neutral-950 transition-colors group-hover:text-neutral-800">
              ESSAARA
            </span>
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-neutral-400 mt-0.5 font-medium">
              Luxurious Ayurveda
            </span>
          </Link>
        </div>

        {/* CART & BADGE TRIGGERS */}
        <div className="w-full lg:w-1/4 flex justify-end items-center gap-4 text-[11px] tracking-widest uppercase font-medium">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-black cursor-pointer relative py-1 bg-transparent border-none"
          >
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Bag</span>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-950">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-950 text-white font-sans text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* CORE 11-PAGE NAVIGATION SYSTEM ROW */}
      <nav className="w-full px-4 bg-white border-b border-neutral-50 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex items-center justify-center gap-6 text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase py-3.5 mx-auto max-w-7xl">
          
          <Link to="/" className={`transition-colors py-1 ${isActive('/') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Home
          </Link>
          
          <Link to="/shop" className={`transition-colors py-1 ${isActive('/shop') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Shop
          </Link>
          
          <Link to="/product/ess-soap-gold" className={`transition-colors py-1 ${location.pathname.startsWith('/product') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Product Details
          </Link>
          
          <Link to="/about" className={`transition-colors py-1 ${isActive('/about') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            About Us
          </Link>
          
          <Link to="/contact" className={`transition-colors py-1 ${isActive('/contact') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Contact
          </Link>
          
          <Link to="/blog" className={`transition-colors py-1 ${isActive('/blog') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Blog
          </Link>
          
          <Link to="/faq" className={`transition-colors py-1 ${isActive('/faq') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            FAQ
          </Link>
          
          <Link to="/cart-checkout" className={`transition-colors py-1 ${isActive('/cart-checkout') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Cart & Checkout
          </Link>
          
          <Link to="/wishlist" className={`transition-colors py-1 ${isActive('/wishlist') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Wishlist
          </Link>
          
          <Link to="/privacy-policy" className={`transition-colors py-1 ${isActive('/privacy-policy') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Privacy Policy
          </Link>
          
          <Link to="/shipping-policy" className={`transition-colors py-1 ${isActive('/shipping-policy') ? 'text-black border-b border-black' : 'text-neutral-500 hover:text-black'}`}>
            Shipping Policy
          </Link>

        </div>
      </nav>

    </header>
  );
};

export default Navbar;
