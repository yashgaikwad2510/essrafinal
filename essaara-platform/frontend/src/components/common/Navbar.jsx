import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const megaMenuData = {
  face: {
    categories: ["Face Moisturizers", "Ubtans", "Facial Cleansers", "Face Masques & Leps", "Exfoliators", "Facial Mists & Toners"],
    concerns: ["Anti-acne", "Oil Control", "Anti Ageing", "Pigmentation", "Dry Skin", "Dark Circles"],
    image: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600",
    promoText: "View All Face Care >"
  },
  bathAndBody: {
    categories: ["Herbal Soaps", "Natural Body Wash", "Body Scrubs", "Massage Oils", "Body Lotions", "Bath Bombs"], // Matches user templates
    concerns: ["Deep Hydration", "Stress Relief", "Skin Brightening", "Detoxification", "Muscle Relaxation"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    promoText: "Explore Bath Rituals >"
  },
  candles: {
    categories: ["Soy Wax Candles", "Aromatherapy Candles", "Spiritual/Puja Candles", "Plantable Concept Candles"], // Matches user templates
    concerns: ["Calmness & Anxiety", "Spiritual Wellness", "Air Purification", "Meditation & Focus"],
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800",
    promoText: "Discover Illumination >"
  },
  gifting: {
    categories: ["Festival Collections", "Seasonal Gift Hampers", "Corporate Gifting", "Customizable Combos"], // Matches discussion document
    concerns: ["Wedding Favors", "Luxury Luxury Gift Hampers", "Wellness Boxes", "Spiritual Gifts"],
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600",
    promoText: "View Gift Catalog >"
  }
};

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const [activeMenu, setActiveMenu] = useState(null); // Tracks 'face', 'bathAndBody', 'candles', or 'gifting'

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Helper component to render the interior layout of any active mega menu panel
  const RenderMegaMenu = ({ data }) => (
    /* FIX 1: We explicitly force the layout context to span the absolute full width of the screen */
    <div className="absolute left-0 right-0 w-full bg-white border-b border-neutral-200 shadow-xl py-10 px-8 md:px-12 z-50 animate-fadeIn">
      
      {/* FIX 2: Added a clean grid structure layout to prevent column text overlapping */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-left">
        
        {/* Column 1: Categories */}
        <div className="flex flex-col min-w-0">
          <h5 className="font-sans text-xs font-bold tracking-widest text-essaara-earth uppercase border-b border-neutral-100 pb-2 mb-4">
            Shop by Category
          </h5>
          {/* Added standard layout spacing so links don't crowd each other */}
          <div className="flex flex-col gap-2.5 text-xs font-light text-neutral-600">
            {data.categories.map((cat, idx) => (
              <a key={idx} href={`/shop?category=${cat.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-essaara-gold transition-colors truncate">
                {cat}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Concerns / Intentions */}
        <div className="flex flex-col min-w-0">
          <h5 className="font-sans text-xs font-bold tracking-widest text-essaara-earth uppercase border-b border-neutral-100 pb-2 mb-4">
            Shop by Concern
          </h5>
          <div className="flex flex-col gap-2.5 text-xs font-light text-neutral-600">
            {data.concerns.map((con, idx) => (
              <a key={idx} href={`/shop?concern=${con.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-essaara-gold transition-colors truncate">
                {con}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Structural Spacer for Layout Breathability */}
        <div className="hidden lg:block"></div>

        {/* Column 4: Promotional Media Card Panel */}
        <div className="relative overflow-hidden group/promo aspect-[16/9] w-full rounded-xs hidden sm:block">
          <img 
            src={data.image} 
            alt="Essaara Brand Campaign Banner" 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover/promo:scale-103"
          />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <a 
              href="/shop" 
              className="bg-white/90 text-essaara-earth border border-essaara-earth font-sans text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 backdrop-blur-xs hover:bg-black hover:text-white transition-all duration-300"
            >
              {data.promoText}
            </a>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <header className="w-full bg-white border-b border-neutral-100 sticky top-0 z-50" onMouseLeave={() => setActiveMenu(null)}>
      
      {/* HEADER TOP ROW (Utility and Brand Logo) */}
      <div className="w-full flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 text-[11px] font-sans font-medium tracking-widest text-neutral-700">
          <button className="flex items-center gap-1.5 hover:text-essaara-gold cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
            </svg>
            STORES
          </button>
          <span className="text-neutral-300">|</span>
          <span className="cursor-pointer hover:text-essaara-gold">Requests ▾</span>
        </div>

        <div className="text-center">
          <a href="/" className="flex flex-col items-center group">
            <span className="font-serif text-xl md:text-2xl tracking-[0.2em] font-medium text-essaara-earth uppercase">Essaara</span>
            <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-neutral-400 group-hover:text-essaara-gold transition-colors mt-0.5">Luxurious Ayurveda</span>
          </a>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-sans font-medium tracking-widest text-neutral-700">
          <a href="/account" className="hover:text-essaara-gold hidden sm:inline">ACCOUNT</a>
          <a href="/wishlist" className="hover:text-essaara-gold hidden sm:inline">WISHLIST</a>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center p-1 cursor-pointer hover:text-essaara-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>

      {/* HEADER BOTTOM ROW (Navigation Menu & Mega Dropdown Mounts) */}
      <nav className="w-full border-t border-neutral-50 relative bg-white">
        <ul className="flex justify-center items-center gap-8 max-w-7xl mx-auto py-3 px-4">
          
          {/* LINK 1: FACE */}
          <li className="static" onMouseEnter={() => setActiveMenu('face')}>
            <a href="/category/face" className="font-sans text-[11px] font-semibold tracking-widest text-essaara-earth uppercase py-2 block border-b-2 border-transparent hover:border-essaara-gold transition-all">
              Face
            </a>
            {activeMenu === 'face' && <RenderMegaMenu data={megaMenuData.face} />}
          </li>

          {/* LINK 2: BATH & BODY */}
          <li className="static" onMouseEnter={() => setActiveMenu('bathAndBody')}>
            <a href="/category/bath-body" className="font-sans text-[11px] font-semibold tracking-widest text-essaara-earth uppercase py-2 block border-b-2 border-transparent hover:border-essaara-gold transition-all">
              Bath & Body
            </a>
            {activeMenu === 'bathAndBody' && <RenderMegaMenu data={megaMenuData.bathAndBody} />}
          </li>

          {/* LINK 3: CANDLES */}
          <li className="static" onMouseEnter={() => setActiveMenu('candles')}>
            <a href="/category/candles" className="font-sans text-[11px] font-semibold tracking-widest text-essaara-earth uppercase py-2 block border-b-2 border-transparent hover:border-essaara-gold transition-all">
              Candles
            </a>
            {activeMenu === 'candles' && <RenderMegaMenu data={megaMenuData.candles} />}
          </li>

          {/* LINK 4: GIFTING (With custom promotional marker tag) */}
          <li className="static" onMouseEnter={() => setActiveMenu('gifting')}>
            <div className="relative">
              <a href="/category/gifting" className="font-sans text-[11px] font-semibold tracking-widest text-essaara-earth uppercase py-2 block border-b-2 border-transparent hover:border-essaara-gold transition-all">
                Gifting
              </a>
              <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white font-sans font-bold text-[7px] tracking-wider px-1 py-0.5 rounded-xs uppercase">
                New
              </span>
            </div>
            {activeMenu === 'gifting' && <RenderMegaMenu data={megaMenuData.gifting} />}
          </li>

          {/* LINK 5: ABOUT US (Simple static redirect, no sub-panel drawer needed) */}
          <li onMouseEnter={() => setActiveMenu(null)}>
            <a href="/about" className="font-sans text-[11px] font-semibold tracking-widest text-essaara-earth uppercase py-2 hover:text-essaara-gold transition-colors block">
              About Us
            </a>
          </li>

        </ul>
      </nav>

    </header>
  );
};

export default Navbar;
