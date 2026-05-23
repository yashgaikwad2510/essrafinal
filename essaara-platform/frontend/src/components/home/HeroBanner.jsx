import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full relative bg-neutral-900 overflow-hidden aspect-[16/5] min-h-[300px] flex items-center">
      
      {/* =========================================================================
          BACKGROUND LAYER: FROM YOUR SKETCH (Full-Bleed Background Image)
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src="/images/hero-16-5.png" 
          alt="Essaara Luxurious Ayurveda"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-[2000ms]"
        />
        {/* Subtle gradient to ensure text readability without making the whole image dull */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT LAYER: FROM YOUR SKETCH (Left-Aligned Text Block)
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-left text-white animate-fadeIn">
        <div className="max-w-xl flex flex-col items-start">
          
          {/* Subtle sub-header tagline tracking */}
          <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-neutral-200/90 mb-4 drop-shadow-xs">
            Purely Ayurvedic • Naturally Divine
          </span>

          {/* Headline matching the exact wording and styling in drawing */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-wide font-light leading-[1.15] drop-shadow-md uppercase">
            Perfectfully hand <br />
            <span className="font-sans font-bold text-2xl md:text-4xl lg:text-5xl tracking-[0.1em] block mt-1 text-white/95">
              CRAFED.
            </span>
          </h1>

          <div className="w-12 h-[1px] bg-white/50 my-6" />

          <p className="font-sans text-xs md:text-sm text-neutral-200/95 leading-relaxed tracking-wide font-light max-w-md mb-8 drop-shadow-xs">
            Immerse your everyday spaces and skin sanctuary in time-tested formulations, mixed with small-batch patience and therapeutic focus.
          </p>

          {/* Minimal Editorial Button Link */}
          <button 
            onClick={() => navigate('/shop')}
            className="font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-transparent hover:text-white border border-white px-8 py-3.5 transition-all duration-300 rounded-xs shadow-md cursor-pointer flex items-center gap-3 group"
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
