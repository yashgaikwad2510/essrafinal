import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FAF9F5] py-20 px-6 md:px-12 lg:px-16 border-b border-neutral-100 relative overflow-hidden text-essaara-earth">
      
      {/* Decorative Canvas Background Accents */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
        
        {/* LEFT COLUMN: HERO TEXT COPY SYSTEM */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-amber-800 uppercase mb-3">
            The Perfect Formula. Uniquely Yours.
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-950 uppercase tracking-wide font-light leading-[1.15] mb-6">
            Purely Handcrafted <br />
            <span className="font-normal italic text-amber-900">Ayurvedic Rituals</span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-neutral-600 leading-relaxed tracking-wide max-w-xl mb-8 font-light">
            Restore harmony to your body and mind with 100% chemical-free compositions. From raw herbal powders to custom gold-infused soaps and plantable concept candles, we bring timeless wellness to your modern spaces.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="font-sans text-xs font-bold tracking-widest uppercase bg-black hover:bg-essaara-earth text-white border border-black hover:border-essaara-earth px-8 py-4 transition-all duration-300 rounded-xs shadow-xs cursor-pointer flex items-center gap-3"
          >
            Discover Your Ritual
            <span>➔</span>
          </button>
        </div>

        {/* RIGHT COLUMN: REPLACING THE PLACEHOLDER BOX WITH AN ARTISTIC ASSET CONTAINER */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="w-full max-w-md aspect-[4/5] bg-white border border-neutral-200/50 rounded-xs p-6 shadow-md relative group overflow-hidden flex items-center justify-center">
            {/* Main high-end promotional placeholder layer */}
            <img 
              src="https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600" // Replace this with your custom Midjourney Ayurvedic asset later!
              alt="Essaara Botanical Wellness Rituals" 
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-101"
            />
            {/* Fine framing border effect */}
            <div className="absolute inset-4 border border-neutral-100 pointer-events-none transition-all duration-500 group-hover:inset-3" />
          </div>
        </div>

      </div>

    </section>
  );
};

export default HeroBanner;
