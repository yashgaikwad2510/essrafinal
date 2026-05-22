import React, { useState } from 'react';

const GiftingHero = ({ onCategoryChange }) => {
  // Sub-category capsule array mapped from ESSAARA WEBSITE DISCUSSION QUESTIONS.pdf
  const subCategories = [
    { id: "all", label: "All Gifts" },
    { id: "hampers", label: "Luxury Hampers" },
    { id: "seasonal", label: "Festival Collections" },
    { id: "corporate", label: "Corporate Gifting" },
    { id: "custom", label: "Customizable Boxes" }
  ];

  const [activeSubCat, setActiveSubCat] = useState("all");

  const handleSubCatClick = (id) => {
    setActiveSubCat(id);
    if (onCategoryChange) onCategoryChange(id);
  };

  return (
    <div className="w-full bg-white flex flex-col items-center">
      
      {/* =========================================================================
          MODULE 1: IMMERSIVE HERO BANNER CANVAS
          ========================================================================= */}
      <div className="relative w-full aspect-[21/9] min-h-[340px] bg-neutral-100 overflow-hidden">
        {/* Editorial Background Image - Focused right for text layout protection */}
        <img 
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600" // Premium corporate/luxury gift imagery placeholder
          alt="Essaara Luxurious Gifting Collection" 
          className="w-full h-full object-cover object-right"
        />

        {/* Soft elegant vignette gradient overlay to guarantee white typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

        {/* Left-Aligned Minimalist Text Overlay */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 max-w-xl text-white">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase mb-3 drop-shadow-xs">
            Sacred Gifting
          </h1>
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase font-light text-white/90">
            Pure Intentions | Artisanal Wellness Hampers
          </p>
        </div>
      </div>

      {/* =========================================================================
          MODULE 2: FLOATING CAPSULE NAVIGATION BAR
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto py-8 px-6 overflow-x-auto scrollbar-hide">
        <div className="flex sm:flex-wrap justify-start sm:justify-center items-center gap-3 min-w-max sm:min-w-0 mx-auto">
          {subCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSubCatClick(cat.id)}
              className={`font-sans text-[11px] font-medium tracking-widest uppercase px-6 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                activeSubCat === cat.id
                  ? 'bg-essaara-earth text-white border-essaara-earth'
                  : 'bg-white text-neutral-600 border-neutral-300 hover:border-essaara-earth hover:text-essaara-earth'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default GiftingHero;
