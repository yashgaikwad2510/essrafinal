import React from 'react';

const ProductSpotlight = () => {
  return (
    <section className="w-full bg-[#FDFBF7] py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto text-left select-none">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
        
        {/* =========================================================================
            LEFT COLUMN (Tagline, Badge, Description, and Close-Up Texture Image)
            ========================================================================= */}
        <div className="md:col-span-5 flex flex-col pt-4">
          
          {/* Minimalist Subheading */}
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#A68B7C] mb-6">
            Pure & Natural
          </span>

          {/* Floating Brand Roundel Badge */}
          <div className="w-16 h-16 rounded-full bg-[#C29B7C]/20 border border-[#C29B7C]/40 flex items-center justify-center p-1.5 mb-8">
            <div className="w-full h-full rounded-full border border-dashed border-[#A68B7C]/60 flex flex-col items-center justify-center text-[7px] font-serif uppercase tracking-tighter text-[#735A4C]">
              <span>Essaara</span>
              <span className="scale-75">✦</span>
            </div>
          </div>

          {/* Premium Copy Block from your blueprint (Sanitized from citation markers) */}
          <p className="font-sans text-xs md:text-sm text-[#735A4C] leading-[1.75] tracking-wide font-light max-w-sm mb-16">
            Our artisan golden soap is lovingly handcrafted with natural organic ingredients. 
            Each bar features a delicate touch of gold, symbolizing transformation and purity. 
            Made with care for your skin and the environment.
          </p>

          {/* Close-Up Texture Portrait Frame (Bottom Left) */}
          <div className="w-full aspect-[4/5] bg-white rounded-none overflow-hidden border border-neutral-200/20 shadow-xs max-w-xs md:max-w-full">
            <img 
              src="/images/soap-texture-closeup.png" 
              alt="Handmade Ayurvedic Gold Soap Detail" 
              className="w-full h-full object-cover filter contrast-[1.02]"
            />
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN (Wrapped Product Image and Massive Serif Typography)
            ========================================================================= */}
        <div className="md:col-span-7 flex flex-col justify-between h-full">
          
          {/* Staggered Wrapped Packaging Frame (Top Right) */}
          <div className="w-full max-w-md md:ml-auto aspect-[3/4] bg-white rounded-none overflow-hidden border border-neutral-200/20 shadow-xs mb-20 md:mb-32">
            <img 
              src="/images/soap-packaging-packaged.png" 
              alt="Golden Aura Premium Packaging" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Massive Minimalist Typography Display (Bottom Right) */}
          <div className="text-right md:pr-4 mt-auto">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-[0.08em] uppercase leading-[0.95] text-[#8C7161]">
              Golden <br />
              <span className="font-serif font-light block mt-2 tracking-[0.12em] text-[#A68B7C]">
                Aura
              </span>
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductSpotlight;
