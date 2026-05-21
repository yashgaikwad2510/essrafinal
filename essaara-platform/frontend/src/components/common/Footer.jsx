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
          LAYER 2 & 3: BOTANICAL OVERLAYS + DARK CHARCOAL LINING
          ========================================================================= */}
      <div className="relative bg-[#363636] text-[#F4EFE6] pt-16 pb-12 px-6 md:px-12 lg:px-16 mt-6">
        
        {/* Left Plant Asset */}
        <div className="absolute left-0 top-0 -translate-y-[30%] z-10 pointer-events-none w-[200px] md:w-[280px] lg:w-[350px] hidden sm:block">
          <img 
            src="/images/leaf-left.png"
            alt="Ayurvedic Botanical Accent"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Plant Asset */}
        <div className="absolute right-0 top-0 -translate-y-[65%] z-10 pointer-events-none w-[220px] md:w-[300px] lg:w-[380px] hidden sm:block">
          <img 
            src="/images/leaf-right.png"
            alt="Natural Flora Accent"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 relative z-20">
          
          {/* COLUMN 1: SHOP CATALOG LINKS */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-1">Shop</h4>
            <ul className="flex flex-col gap-3 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/shop" className="hover:text-essaara-gold transition-colors duration-200">All Products</a></li>
              <li><a href="/category/skincare" className="hover:text-essaara-gold transition-colors duration-200">Skin Care</a></li>
              <li><a href="/category/candles" className="hover:text-essaara-gold transition-colors duration-200">Candles</a></li>
              <li><a href="/category/bath" className="hover:text-essaara-gold transition-colors duration-200">Bath & Body</a></li>
              <li><a href="/category/gifting" className="hover:text-essaara-gold transition-colors duration-200">Best Sellers</a></li>
            </ul>
          </div>

          {/* COLUMN 2: CUSTOMER CARE */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-1">Customer Care</h4>
            <ul className="flex flex-col gap-3 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/contact" className="hover:text-essaara-gold transition-colors duration-200">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-essaara-gold transition-colors duration-200">FAQs</a></li>
              <li><a href="/shipping-policy" className="hover:text-essaara-gold transition-colors duration-200">Delivery and Returns</a></li>
              <li><a href="/privacy-policy" className="hover:text-essaara-gold transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>

          {/* COLUMN 3: QUICK LINKS */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-1">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/about" className="hover:text-essaara-gold transition-colors duration-200">About Us</a></li>
              <li><a href="/rituals" className="hover:text-essaara-gold transition-colors duration-200">Complimentary Ritual</a></li>
              <li><a href="/blog" className="hover:text-essaara-gold transition-colors duration-200">Essaara Cares</a></li>
              <li><a href="/corporate-gifting" className="hover:text-essaara-gold transition-colors duration-200">Corporate Gifting</a></li>
            </ul>
          </div>

          {/* COLUMN 4: ACCOUNT FLOWS */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-1">My Account</h4>
            <ul className="flex flex-col gap-3 text-xs font-light text-neutral-300 tracking-wide">
              <li><a href="/profile" className="hover:text-essaara-gold transition-colors duration-200">My Profile</a></li>
              <li><a href="/orders" className="hover:text-essaara-gold transition-colors duration-200">My Orders</a></li>
              <li><a href="/track" className="hover:text-essaara-gold transition-colors duration-200">Track My Order</a></li>
            </ul>
          </div>

          {/* COLUMN 5: NEWSLETTER SUBSCRIPTION FORM */}
          <div className="flex flex-col gap-3 col-span-2 lg:col-span-1">
            <h4 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-white mb-1">Sign Up For Our Newsletter!</h4>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <label className="text-[11px] font-serif italic text-neutral-300 mb-1 tracking-wide">
                Your Email Id*
              </label>
              <div className="flex bg-white w-full max-w-sm rounded-sm overflow-hidden">
                <input 
                  type="email" 
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-neutral-800 text-xs font-light tracking-wide placeholder-neutral-500 w-full px-4 py-2.5 focus:outline-hidden"
                  required
                />
                <button 
                  type="submit" 
                  disabled={!consentChecked}
                  className="text-neutral-900 font-sans text-[10px] font-bold uppercase tracking-widest px-4 border-l border-neutral-200 hover:bg-neutral-50 disabled:opacity-40 transition-all cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer group mt-2">
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

        {/* SUB-FOOTER: COPYRIGHT & SOCIALS */}
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#4a4a4a] flex flex-col md:flex-row items-center justify-between gap-4 relative z-20">
          <p className="text-[10px] text-neutral-400 tracking-widest uppercase font-light">
            &copy; {new Date().getFullYear()} Essaara. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>

        {/* FLOATING ACTION ELEMENT: BACK TO TOP TOGGLE */}
        <button 
          onClick={scrollToTop}
          className="absolute left-6 md:left-12 bottom-12 bg-white text-[#363636] hover:bg-essaara-gold hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer z-30"
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
