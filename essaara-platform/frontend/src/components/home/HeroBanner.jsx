import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    // Hard locked to your 16:5 sleek cinematic ratio
    <section className="w-full relative bg-[#E1C9C3] overflow-hidden aspect-[16/5] min-h-[350px] md:min-h-[420px] flex items-center text-left">
      
      {/* =========================================================================
          BACKGROUND LAYER: 100% UNTOUCHED, RADIANT ARTWORK FROM EDGE TO EDGE
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img 
          src="/images/herobanner.png" 
          alt="Essaara Botanical Illustration Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Absolutely zero color-washing or dark overlays. Your image stays fully vibrant! */}
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT LAYER: PREMIUM TRANSLUCENT GLASS CANVASES
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 animate-fadeIn">
        
        {/* 
          THE GLASS CARD: 
          Uses a soft white backdrop-filter blur. It acts like a high-end luxury pane of glass, 
          letting the rich colors of the flowers shine through while isolating the dark text beautifully.
        */}
        <div className="max-w-xs sm:max-w-md md:max-w-lg bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-xs border border-white/30 shadow-xl flex flex-col items-start">
          
          {/* Tracking Tagline */}
          <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-amber-900 mb-3">
            Purely Ayurvedic • Naturally Divine
          </span>

          {/* Core Typography */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide font-light leading-[1.1] uppercase text-neutral-950">
            Perfectfully <br />
            hand <br />
            <span className="font-serif font-normal block mt-1 text-amber-950">
              Crafed.
            </span>
          </h1>

          <div className="w-12 h-[1px] bg-amber-900/40 my-4 md:my-5" />

          <p className="font-sans text-xs md:text-sm text-neutral-800 leading-relaxed tracking-wide font-normal max-w-xs md:max-w-sm mb-6">
            Immerse your everyday spaces and skin sanctuary in time-tested formulations, mixed with small-batch patience and therapeutic focus.
          </p>

          {/* Clean Solid Luxury Action Link */}
          <button 
            onClick={() => navigate('/shop')}
            className="font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase bg-neutral-950 hover:bg-amber-900 text-white px-7 py-3.5 transition-all duration-300 rounded-xs shadow-md cursor-pointer flex items-center gap-3 group"
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
