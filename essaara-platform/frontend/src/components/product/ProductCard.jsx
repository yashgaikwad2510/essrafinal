import React, { useState } from 'react';

const ProductCard = ({ product, onAddToWishlist, onAddToCart }) => {
  // Destructure product data matching our asset sheets and schemas
  const { 
    name, 
    subTitle,      // e.g., "Quick-absorbing, Moisturizing"
    variants,      // Array of objects: [{ size: '100g', price: 1645 }, { size: '200g', price: 2850 }]
    rating,        // e.g., 4.8
    reviewCount,   // e.g., 164
    images,        // Array of image URLs
    isBestseller,
    awardBadge     // e.g., 'Elle Beauty Awards'
  } = product;

  // Local state to track the user's selected variant
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleVariantChange = (e) => {
    const variant = variants.find(v => v.size === e.target.value);
    if (variant) setSelectedVariant(variant);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) onAddToWishlist(product._id);
  };

  return (
    <div className="group relative flex flex-col w-full bg-white transition-all duration-300">
      
      {/* 1. IMAGE CANVAS & OVERLAY BADGES */}
      <div className="relative aspect-[3/4] w-full bg-[#F7F7F7] flex items-center justify-center p-6 overflow-hidden">
        {/* Product Image */}
        <img 
          src={images[0]} 
          alt={name} 
          className="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top-Left Dynamic Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {isBestseller && (
            <span className="bg-[#333333] text-white text-[10px] font-sans font-bold tracking-wider px-2 py-0.5 uppercase shadow-sm">
              Best Seller
            </span>
          )}
          {awardBadge && (
            <span className="bg-white/90 border border-neutral-200 text-neutral-800 text-[9px] font-sans px-1.5 py-0.5 rounded-sm shadow-xs backdrop-blur-xs">
              {awardBadge}
            </span>
          )}
        </div>

        {/* Bottom-Right Wishlist Heart */}
        <button 
          onClick={handleWishlistToggle}
          className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-xs transition-colors duration-200 cursor-pointer"
          aria-label="Add to Wishlist"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill={isWishlisted ? "#2C2520" : "none"} 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-4 h-4 transition-colors duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      {/* 2. INFORMATION HIERARCHY BLOCK */}
      <div className="flex flex-col pt-4 pb-2 px-1 flex-grow">
        
        {/* Social Proof (Stars + Count) */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-500 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-[11px] font-sans text-neutral-400">({reviewCount})</span>
        </div>

        {/* Product Identity Typography */}
        <h3 className="font-sans text-xs font-semibold tracking-wide text-essaara-earth uppercase line-clamp-2 min-h-[32px]">
          {name}
        </h3>
        
        {/* Subtitle / Key Benefit */}
        <p className="font-sans text-[11px] text-neutral-500 mt-1 italic truncate">
          {subTitle}
        </p>

        {/* Variant Info Alert */}
        <p className="font-sans text-[11px] text-neutral-400 mt-1">
          {variants.length} Sizes Available
        </p>

        {/* Live Formatted Price */}
        <p className="font-sans text-xs font-bold text-essaara-earth mt-2">
          ₹{selectedVariant.price.toLocaleString('en-IN')}.00
        </p>
      </div>

      {/* 3. INTERACTIVE DROPDOWN SELECT CTA */}
      <div className="mt-auto pt-2">
        <div className="relative border border-essaara-earth">
          <select 
            value={selectedVariant.size}
            onChange={handleVariantChange}
            className="w-full bg-white text-essaara-earth font-sans text-[11px] font-medium uppercase tracking-wider py-2.5 px-4 pr-10 appearance-none cursor-pointer focus:outline-hidden"
          >
            {variants.map((v) => (
              <option key={v.size} value={v.size}>
                Select Size: {v.size}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-essaara-earth">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {/* Optional Action Execution Button */}
        <button 
          onClick={() => onAddToCart(product._id, selectedVariant)}
          className="w-full mt-2 bg-essaara-earth text-white font-sans text-[11px] font-medium uppercase tracking-widest py-2.5 transition-colors duration-300 hover:bg-essaara-gold cursor-pointer"
        >
          Add to Bag
        </button>
      </div>

    </div>
  );
};

export default ProductCard;
