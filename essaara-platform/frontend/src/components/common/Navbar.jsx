import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full bg-essaara-cream border-b border-gray-200">
      {/* Top Utility Bar */}
      <div className="flex justify-between items-center px-12 py-3 text-xs tracking-widest text-essaara-earth">
        <div className="flex space-x-6">
          <button className="hover:text-essaara-gold transition-colors">SEARCH</button>
          <button className="hover:text-essaara-gold transition-colors">STORES</button>
          <span>₹ INR</span>
        </div>
        
        <div className="flex space-x-6">
          <button className="hover:text-essaara-gold transition-colors">ACCOUNT</button>
          <button className="hover:text-essaara-gold transition-colors">SOUNDARYA CLUB</button>
          <button className="hover:text-essaara-gold transition-colors">SHOPPING BAG (0)</button>
        </div>
      </div>

      {/* The Logo */}
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="font-serif text-4xl tracking-widest text-essaara-earth text-center">
          ESSAARA
          <span className="block text-sm tracking-widest font-sans mt-2 text-gray-500">
            LUXURIOUS AYURVEDA
          </span>
        </h1>
      </div>

      {/* The Navigation Menu */}
      <nav className="flex justify-center space-x-12 pb-6 text-sm tracking-widest font-light">
        <a href="#" className="hover:text-essaara-gold transition-colors">NEW</a>
        <a href="#" className="hover:text-essaara-gold transition-colors">SKINCARE</a>
        <a href="#" className="hover:text-essaara-gold transition-colors">BATH &amp; BODY</a>
        <a href="#" className="hover:text-essaara-gold transition-colors">HAIR CARE</a>
        <div className="relative group">
          <a href="#" className="hover:text-essaara-gold transition-colors">GIFTING</a>
          {/* Promotional Badge */}
          <span className="absolute -top-3 -right-4 bg-essaara-gold text-white text-[9px] px-1.5 py-0.5 tracking-wider">NEW</span>
        </div>
        <a href="#" className="hover:text-essaara-gold transition-colors">OUR STORY</a>
      </nav>
    </header>
  );
};

export default Navbar;
