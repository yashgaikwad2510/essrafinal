import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    // Hard locking to the exact sleek 16:5 cinematic aspect ratio
    <section className="w-full relative bg-[#E1C9C3] overflow-hidden aspect-[16/5] min-h-[350px] md:min-h-[420px] flex items-center text-left">
      
      {/* =========================================================================
          BACKGROUND LAYER: 100% RAW AND UNTOUCHED ACROSS YOUR MARKED ZONE
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img 
          src="/images/herobanner.png" 
          alt="Essaara Botanical Illustration Background"
          className="w-full h-full object-cover object-center"
        />
        {/* No global gradients or tints over your marked center-right canvas zone! */}
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT LAYER: LOCALIZED CAPSULE ONLY ON THE LEFT
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 animate-fadeIn">
        <div className="max-w-xs sm:max-w-md md:max-w-lg">
          
          {/* 
            LOCAL TEXT BOX: 
            Applies a premium, highly localized ambient white fog behind the text block.
            This keeps your dark text sharp and crisp without touching any of the background artwork outside this frame.
          */}
          <div className="w-full bg-white/20 backdrop-blur-xs p-6 md:p-8 rounded-sm border border-white/20 shadow-xs flex flex-col items-start">
            
            {/* Tracking Tagline */}
            <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-amber-900/90 mb-3">
              Purely Ayurvedic • Naturally Divine
            </span>

            {/* Perfect Wording and Casing from your layout blueprint */}
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
      </div>

    </section>
  );
};

export default HeroBanner;
