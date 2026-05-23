import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    /* 
      OUTER FRAMING CONTAINER:
      px-[6px] applies your exact 5px-6px side margins to un-stick it from the browser window edges.
      pt-2 pb-4 adds a touch of breathing room between the navigation bar and the bestseller rows below.
    */
    <div className="w-full bg-white px-[6px] pt-2 pb-4 max-w-[1440px] mx-auto">
      
      {/* 
        INNER HERO CANVAS:
        rounded-2xl adds the smooth curved edges to both the layout box and the running artwork underlay.
        aspect-[16/5] holds your perfect thin screen ratio perfectly.
      */}
      <section className="w-full relative bg-[#E1C9C3] overflow-hidden rounded-2xl aspect-[16/5] min-h-[350px] md:min-h-[420px] flex items-center text-left shadow-xs">
        
        {/* =========================================================================
            BACKGROUND LAYER: 100% RAW AND UNTOUCHED INSIDE THE CURVED FRAME
            ========================================================================= */}
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
          <img 
            src="/images/herobanner.png" 
            alt="Essaara Botanical Illustration Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* =========================================================================
            FOREGROUND CONTENT LAYER: FIXED SAFELY ON THE RIGHT SPACE VIEWPORT
            ========================================================================= */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 animate-fadeIn flex justify-end">
          
          {/* Subtle text glass capsule container */}
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-white/10 backdrop-blur-xs p-6 md:p-8 rounded-xl border border-white/10 shadow-xs flex flex-col items-start">
            
            {/* Tracking Tagline */}
            <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-amber-900/90 mb-3">
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

            <div className="w-12 h-[1px] bg-amber-900/20 my-4 md:my-5" />

            <p className="font-sans text-xs md:text-sm text-neutral-800 leading-relaxed tracking-wide font-normal max-w-xs mb-6">
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
    </div>
  );
};

export default HeroBanner;
