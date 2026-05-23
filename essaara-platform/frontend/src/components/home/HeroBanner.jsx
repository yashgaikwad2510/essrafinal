import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    // Set to the exact 16:5 ultra-premium thin banner ratio you requested
    <section className="w-full relative bg-[#E1C9C3] overflow-hidden aspect-[16/5] min-h-[340px] md:min-h-[400px] flex items-center text-left">
      
      {/* =========================================================================
          RIGHT SIDE: UNTOUCHED, UNCROPPED BACKGROUND IMAGE
          ========================================================================= */}
      <div className="absolute inset-y-0 right-0 w-7/12 h-full select-none pointer-events-none hidden md:block">
        <img 
          src="/images/herobanner.png" 
          alt="Essaara Botanical Illustration Background"
          className="w-full h-full object-contain object-right" 
          /* object-contain ensures the image never cuts off, object-right keeps it flush to the edge */
        />
      </div>

      {/* Mobile background fallback to keep it responsive */}
      <div className="absolute inset-0 w-full h-full md:hidden opacity-30 select-none pointer-events-none">
        <img 
          src="/images/herobanner.png" 
          alt="Essaara Background Mobile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* =========================================================================
          LEFT SIDE: SOLID COMPLEMENTARY CONTENT WINDOW (Zero Image Dullness!)
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-neutral-900 animate-fadeIn">
        <div className="max-w-xs sm:max-w-md md:max-w-lg flex flex-col items-start">
          
          {/* Elegant Subheader */}
          <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.35em] uppercase text-amber-900 mb-2 md:mb-3">
            Purely Ayurvedic • Naturally Divine
          </span>

          {/* Core Typography — Now beautifully dark and crisp against the complementary tone */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide font-light leading-[1.1] uppercase text-neutral-950">
            Perfectfully <br />
            hand <br />
            <span className="font-serif font-normal block mt-1 text-amber-950">
              Crafed.
            </span>
          </h1>

          <div className="w-10 h-[1px] bg-amber-900/30 my-4 md:my-5" />

          <p className="font-sans text-[11px] md:text-xs lg:text-sm text-neutral-700 leading-relaxed tracking-wide font-light max-w-xs md:max-w-sm mb-5 md:mb-6">
            Immerse your everyday spaces and skin sanctuary in time-tested formulations, mixed with small-batch patience and therapeutic focus.
          </p>

          {/* Solid Luxury Button */}
          <button 
            onClick={() => navigate('/shop')}
            className="font-sans text-[9px] md:text-[10px] font-bold tracking-widest uppercase bg-neutral-950 hover:bg-amber-900 text-white px-5 md:px-7 py-3 transition-all duration-300 rounded-xs shadow-md cursor-pointer flex items-center gap-3 group"
          >
            Explore Collection
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">➔</span>
          </button>

        </div>
      </div>

    </section>
  );
};

export default HeroBanner;
