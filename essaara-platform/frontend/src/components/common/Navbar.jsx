import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  // Calculate the live number of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Helper to check active state styling
  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white border-b border-neutral-100 sticky top-0 z-40 font-sans text-essaara-earth">
      
      {/* =========================================================================
          TOP ROW: FROM YOUR SKETCH (Contact, Logo, Wishlist, Bag)
          ========================================================================= */}
      <div className="w-full px-6 py-4 flex justify-between items-center border-b border-neutral-100 max-w-7xl mx-auto">
        
        {/* Left Section: Contact & Custom Order */}
        <div className="w-1/3 text-left">
          <Link 
            to="/contact" 
            className="text-xs font-medium uppercase tracking-widest text-neutral-600 hover:text-black transition-colors"
          >
            Contact & custom order 
          </Link>
        </div>

        {/* Center Section: Main Brand Logo */}
        <div className="w-1/3 text-center">
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-light text-neutral-950 transition-colors group-hover:text-neutral-800 uppercase">
              Essaara
            </span>
          </Link>
        </div>

        {/* Right Section: Wishlist & Bag */}
        <div className="w-1/3 flex justify-end items-center gap-6 text-xs font-medium uppercase tracking-widest text-neutral-600">
          <Link 
            to="/wishlist" 
            className="hover:text-black transition-colors"
          >
            wish list 
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 hover:text-black cursor-pointer bg-transparent border-none py-1"
          >
            <span>Bag</span> 
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-neutral-950">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-950 text-white font-sans text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-scaleIn">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>
        </div>

      </div>

      {/* =========================================================================
          BOTTOM ROW: CENTERED CORE MENU LINKS (Home, Shop, About, Blog, FAQ)
          ========================================================================= */}
      <nav className="w-full bg-white px-4">
        <div className="flex items-center justify-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase py-3 mx-auto max-w-7xl">
          
          <Link 
            to="/" 
            className={`transition-colors py-0.5 ${isActive('/') ? 'text-black border-b border-black' : 'text-neutral-400 hover:text-black'}`}
          >
            Home
          </Link>
          
          <Link 
            to="/shop" 
            className={`transition-colors py-0.5 ${isActive('/shop') ? 'text-black border-b border-black' : 'text-neutral-400 hover:text-black'}`}
          >
            shop
          </Link>
          
          <Link 
            to="/about" 
            className={`transition-colors py-0.5 ${isActive('/about') ? 'text-black border-b border-black' : 'text-neutral-400 hover:text-black'}`}
          >
            About us
          </Link>
          
          <Link 
            to="/blog" 
            className={`transition-colors py-0.5 ${isActive('/blog') ? 'text-black border-b border-black' : 'text-neutral-400 hover:text-black'}`}
          >
            Blog
          </Link>
          
          <Link 
            to="/faq" 
            className={`transition-colors py-0.5 ${isActive('/faq') ? 'text-black border-b border-black' : 'text-neutral-400 hover:text-black'}`}
          >
            Faq
          </Link>

        </div>
      </nav>

    </header>
  );
};

export default Navbar;
