import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    // Explicit widescreen mode matching image_bd6c8b.png
    <section className="w-full relative bg-[#E1C9C3] overflow-hidden aspect-[21/9] min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center">
      
      {/* =========================================================================
          BACKGROUND LAYER: 100% BRIGHT & CRISP UNTOUCHED ARTWORK
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img 
          src="/images/herobanner.png" 
          alt="Essaara Botanical Illustration Background"
          className="w-full h-full object-cover object-center"
        />
        {/* NO dark overlays or dull vignettes here anymore—your artwork stays completely vibrant! */}
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT LAYER: WITH ADVANCED TEXT SHADOW CONTRAST
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-left text-white animate-fadeIn">
        <div className="max-w-md md:max-w-lg flex flex-col items-start">
          
          {/* Tagline with drop shadow */}
          <span 
            className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-white mb-3"
            style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.45)' }}
          >
            Purely Ayurvedic • Naturally Divine
          </span>

          {/* Headline with custom composite text-shadow for absolute legibility on light areas */}
          <h1 
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide font-light leading-[1.1] uppercase"
            style={{ 
              textShadow: `
                1px 1px 3px rgba(0, 0, 0, 0.5), 
                0px 0px 20px rgba(0, 0, 0, 0.35)
              ` 
            }}
          >
            Perfectfully <br />
            hand <br />
            <span className="font-serif font-normal block mt-1">
              Crafed.
            </span>
          </h1>

          <div className="w-12 h-[1px] bg-white my-5 md:my-6 shadow-xs" />

          {/* Paragraph body copy with crisp drop shadow */}
          <p 
            className="font-sans text-xs md:text-sm text-white leading-relaxed tracking-wide font-normal max-w-sm md:max-w-md mb-6 md:mb-8"
            style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)' }}
          >
            Immerse your everyday spaces and skin sanctuary in time-tested formulations, mixed with small-batch patience and therapeutic focus.
          </p>

          {/* Button with strong contrast alignment */}
          <button 
            onClick={() => navigate('/shop')}
            className="font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-900 hover:text-white border border-white px-6 md:px-8 py-3.5 transition-all duration-300 rounded-xs cursor-pointer flex items-center gap-3 group shadow-lg"
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
