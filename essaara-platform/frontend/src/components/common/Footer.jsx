import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (consentChecked && email) {
      console.log(`Subscribed email: ${email}`);
      // Integrate newsletter subscription API hook here
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white pt-20 overflow-visible">
      
      {/* =========================================================================
          LAYER 1: TRUST DISCLAIMER AREA (WHITE CANVAS)
          ========================================================================= */}
      <div className="w-full text-center px-6 max-w-4xl mx-auto pb-16">
        <p className="font-serif text-sm md:text-base text-neutral-700 tracking-wide leading-relaxed mb-2">
          Please beware of fraudulent messages and phone calls on behalf of Essaara.
        </p>
        <p className="font-sans text-xs md:text-sm text-neutral-500 tracking-wide font-light">
          We NEVER ask for bank details, OTPs, advance cash payments or engage in lotteries.
        </p>
      </div>

      {/* =========================================================================
          LAYER 2: ABSOLUTE-POSITIONED BOTANICAL OVERLAYS (THE "PLANT" EFFECT)
          ========================================================================= */}
      {/* Left Plant Asset */}
      <div className="absolute left-0 bottom-[340px] md:bottom-[260px] z-10 pointer-events-none w-1/4 max-w-[240px] hidden sm:block">
        <img 
          src="/images/leafLeftLG.png"
          alt="Ayurvedic Botanical Accent"
          className="w-full h-auto object-contain origin-bottom-left"
        />
      </div>

      {/* Right Plant Asset */}
      <div className="absolute right-0 bottom-[340px] md:bottom-[240px] z-10 pointer-events-none w-1/4 max-w-[260px] hidden sm:block">
        <img 
          src="/images/leafRightlg.png"
          alt="Natural Flora Accent"
          className="w-full h-auto object-contain origin-bottom-right"
        />
      </div>


      {/* =========================================================================
          LAYER 3: CORE CONTENT SYSTEM (DARK CHARCOAL LINING)
          ========================================================================= */}
      <div className="relative bg-[#2C2520] text-[#F4EFE6] pt-16 pb-12 px-6 md:px-12 lg:px-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
          
          {/* COLUMN 1: SHOP CATALOG LINKS */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">Shop</h4>
            <ul className="flex flex-col gap-2 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/shop" className="hover:text-essaara-gold transition-colors duration-200">All Products</a></li>
              <li><a href="/category/skincare" className="hover:text-essaara-gold transition-colors duration-200">Skin Care</a></li>
              <li><a href="/category/candles" className="hover:text-essaara-gold transition-colors duration-200">Candles</a></li>
              <li><a href="/category/bath" className="hover:text-essaara-gold transition-colors duration-200">Bath & Body</a></li>
              <li><a href="/category/gifting" className="hover:text-essaara-gold transition-colors duration-200">Best Sellers</a></li>
            </ul>
          </div>

          {/* COLUMN 2: CUSTOMER CARE */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">Customer Care</h4>
            <ul className="flex flex-col gap-2 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/contact" className="hover:text-essaara-gold transition-colors duration-200">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-essaara-gold transition-colors duration-200">FAQs</a></li>
              <li><a href="/shipping-policy" className="hover:text-essaara-gold transition-colors duration-200">Delivery and Returns</a></li>
              <li><a href="/privacy-policy" className="hover:text-essaara-gold transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>

          {/* COLUMN 3: QUICK LINKS */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/about" className="hover:text-essaara-gold transition-colors duration-200">About Us</a></li>
              <li><a href="/rituals" className="hover:text-essaara-gold transition-colors duration-200">Complimentary Ritual</a></li>
              <li><a href="/blog" className="hover:text-essaara-gold transition-colors duration-200">Essaara Cares</a></li>
              <li><a href="/corporate-gifting" className="hover:text-essaara-gold transition-colors duration-200">Corporate Gifting</a></li>
            </ul>
          </div>

          {/* COLUMN 4: ACCOUNT FLOWS */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">My Account</h4>
            <ul className="flex flex-col gap-2 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/profile" className="hover:text-essaara-gold transition-colors duration-200">My Profile</a></li>
              <li><a href="/orders" className="hover:text-essaara-gold transition-colors duration-200">My Orders</a></li>
              <li><a href="/track" className="hover:text-essaara-gold transition-colors duration-200">Track My Order</a></li>
            </ul>
          </div>

          {/* COLUMN 5: NEWSLETTER SUBSCRIPTION FORM */}
          <div className="flex flex-col gap-3 col-span-2 lg:col-span-1">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">Sign Up For Our Newsletter!</h4>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="flex border-b border-neutral-500 pb-1">
                <input 
                  type="email" 
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white text-xs font-light tracking-wide placeholder-neutral-400 w-full focus:outline-hidden"
                  required
                />
                <button 
                  type="submit" 
                  disabled={!consentChecked}
                  className="text-white font-sans text-[10px] font-bold uppercase tracking-widest pl-2 disabled:opacity-40 transition-opacity cursor-pointer"
                >
                  Subscribe
                </button>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer group mt-1">
                <input 
                  type="checkbox" 
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 accent-white rounded-xs cursor-pointer"
                />
                <span className="text-[10px] font-light text-neutral-400 tracking-wide leading-tight group-hover:text-neutral-300 transition-colors">
                  By Checking This Box, You Consent To Our{' '}
                  <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a> and{' '}
                  <a href="/terms" className="underline hover:text-white">Terms Of Use</a>.
                </span>
              </label>
            </form>
          </div>

        </div>

        {/* FLOATING ACTION ELEMENT: BACK TO TOP TOGGLE */}
        <button 
          onClick={scrollToTop}
          className="absolute left-6 md:left-12 bottom-12 bg-white text-[#2C2520] hover:bg-essaara-gold hover:text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>

    </footer>
  );
};

export default Footer;
