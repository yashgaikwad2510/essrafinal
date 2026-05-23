import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // Calculate real total number of items currently in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full bg-white border-b border-neutral-100 sticky top-0 z-40 font-sans text-essaara-earth">
      
      {/* UTILITY UPPER BAR */}
      <div className="w-full border-b border-neutral-50 px-6 py-2.5 flex justify-between items-center text-[11px] tracking-widest uppercase text-neutral-500">
        <div className="flex items-center gap-6">
          <Link to="/contact" className="hover:text-black flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            Our Labs
          </Link>
          <Link to="/contact" className="hover:text-black">Bulk / Corporate Inquiries</Link> 
        </div>
        <div className="hidden md:block font-light">
          Purely Ayurvedic | Naturally Divine | Made in India 
        </div>
        <div>
          <Link to="/faq" className="hover:text-black">Help & FAQ</Link>
        </div>
      </div>

      {/* CORE BRAND HEADER LOGO LINE */}
      <div className="w-full px-6 py-5 flex justify-between items-center relative">
        <div className="w-1/4 hidden lg:block" />
        
        {/* Absolute Centered Branding Core */}
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

        {/* UTILITY ICON INTERACTIVE LINKS */}
        <div className="w-full lg:w-1/4 flex justify-end items-center gap-6 text-[12px] tracking-widest uppercase font-medium">
          <Link to="/contact" className="hover:text-black hidden sm:block">Account</Link>
          <Link to="/wishlist" className="hover:text-black flex items-center gap-1.5">
            Wishlist
          </Link>
          
          {/* Dynamic Interactive Bag Trigger Action */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-black cursor-pointer relative py-1"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-950">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-neutral-950 text-white font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scaleIn">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* CORE LINK NAVIGATION SYSTEM */}
      <nav className="w-full border-t border-neutral-50 px-6 flex justify-center items-center relative bg-white">
        <div className="flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase py-3.5">
          
          <Link to="/shop" className="hover:text-black transition-colors">Face</Link>
          <Link to="/shop" className="hover:text-black transition-colors">Bath & Body</Link>
          
          {/* CANDLES INTERACTIVE MEGA MENU HOVER ANCHOR */}
          <div 
            className="relative py-1"
            onMouseEnter={() => setActiveMegaMenu('candles')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link to="/shop" className="hover:text-black transition-colors flex items-center gap-0.5">
              Candles
            </Link>

            {/* THE NEW CLEAN CANDLE MEGA MENU PANEL */}
            {activeMegaMenu === 'candles' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[700px] bg-white border border-neutral-200/60 shadow-xl rounded-sm p-6 grid grid-cols-12 gap-6 animate-fadeIn text-left z-50 mt-3">
                <div className="col-span-4">
                  <h4 className="font-sans text-[10px] font-black tracking-widest text-neutral-900 uppercase border-b border-neutral-100 pb-2 mb-3">
                    Shop By Category
                  </h4>
                  <div className="flex flex-col gap-2 font-sans text-xs font-light text-neutral-600">
                    <Link to="/shop" className="hover:text-black">Soy Wax Candles</Link>
                    <Link to="/shop" className="hover:text-black">Aromatherapy Candles</Link>
                    <Link to="/shop" className="hover:text-black">Spiritual/Puja Candles</Link>
                    <Link to="/shop" className="hover:text-black">Plantable Concept Candles</Link>
                  </div>
                </div>
                <div className="col-span-4">
                  <h4 className="font-sans text-[10px] font-black tracking-widest text-neutral-900 uppercase border-b border-neutral-100 pb-2 mb-3">
                    Shop By Concern
                  </h4>
                  <div className="flex flex-col gap-2 font-sans text-xs font-light text-neutral-600">
                    <Link to="/shop" className="hover:text-black">Calmness & Anxiety</Link>
                    <Link to="/shop" className="hover:text-black">Spiritual Wellness</Link>
                    <Link to="/shop" className="hover:text-black">Air Purification</Link>
                    <Link to="/shop" className="hover:text-black">Meditation & Focus</Link>
                  </div>
                </div>
                <div className="col-span-4 relative overflow-hidden rounded-xs bg-neutral-50 border border-neutral-100 p-3 flex flex-col justify-between aspect-[4/3]">
                  <div className="text-left">
                    <span className="font-sans text-[8px] font-bold tracking-widest text-amber-800 uppercase block mb-1">Concept Series</span>
                    <h5 className="font-serif text-sm text-neutral-900 leading-tight">From Jyoti to Janani</h5> 
                  </div>
                  <button onClick={() => navigate('/shop')} className="w-full mt-3 bg-neutral-950 text-white font-sans text-[9px] font-bold uppercase tracking-widest py-2 text-center hover:bg-neutral-800 transition-colors">
                    Discover Illumination ➔
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-black transition-colors flex items-center gap-1">
            Gifting
            <span className="bg-amber-700 text-white text-[8px] font-black tracking-normal px-1 py-0.5 rounded-xs leading-none">NEW</span>
          </Link>
          <Link to="/about" className="hover:text-black transition-colors">About Us</Link>
          <Link to="/blog" className="hover:text-black transition-colors">Journal</Link>

        </div>
      </nav>

    </header>
  );
};

export default Navbar;
