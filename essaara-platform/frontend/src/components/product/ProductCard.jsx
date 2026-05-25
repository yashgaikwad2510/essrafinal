import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToWishlist, onAddToCart }) => {
  const { 
    _id,
    id,
    name, 
    subTitle,
    netWt,
    price,
    rating,
    reviewCount,
    productImages,
    isBestseller,
    awardBadge,
    stock
  } = product;

  const productId = id || _id;
  const imagesToUse = productImages || product.images || [];
  const priceToUse = price || (product.variants && product.variants[0] ? product.variants[0].price : 0);

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) onAddToWishlist(productId);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (stock !== 0) {
      onAddToCart(productId, null);
    }
  };

  return (
    <Link to={`/product/${productId}`} className="group relative flex flex-col w-full bg-white transition-all duration-300 border border-neutral-200/60 p-5 rounded-2xl hover:shadow-md shadow-xs h-full justify-between cursor-pointer">
      
      <div>
        {/* 1. IMAGE CANVAS & OVERLAY BADGES */}
        <div className="relative aspect-square w-full bg-[#FAF9F6] flex items-center justify-center p-6 overflow-hidden rounded-xl mb-4">
          <img 
            src={imagesToUse[0]} 
            alt={name} 
            className="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500 ease-out rounded-xl"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
            {isBestseller && (
              <span className="bg-[#333333] text-white text-[10px] font-sans font-bold tracking-wider px-2 py-0.5 uppercase shadow-sm rounded-sm">
                Best Seller
              </span>
            )}
            {awardBadge && (
              <span className="bg-white/90 border border-neutral-200 text-neutral-800 text-[9px] font-sans px-1.5 py-0.5 rounded-sm shadow-xs backdrop-blur-xs">
                {awardBadge}
              </span>
            )}
          </div>

          <button 
            onClick={handleWishlistToggle}
            className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-xs transition-colors duration-200 cursor-pointer z-10"
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
        <div className="flex flex-col pt-2 pb-2 px-1 text-left">
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-amber-500 text-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-[11px] font-sans text-neutral-400">({reviewCount})</span>
            )}
          </div>

          <h3 className="font-sans text-xs font-semibold tracking-wide text-essaara-earth uppercase line-clamp-2 min-h-[32px]">
            {name}
          </h3>
          
          <p className="font-sans text-[11px] text-neutral-500 mt-1 italic truncate">
            {subTitle}
          </p>

          {netWt ? (
            <p className="font-sans text-[11px] text-neutral-400 mt-1">
              Net Wt: {netWt}
            </p>
          ) : (
            <p className="font-sans text-[11px] text-neutral-400 mt-1">
              &nbsp;
            </p>
          )}

          <p className="font-sans text-xs font-bold text-essaara-earth mt-2">
            ₹{priceToUse.toLocaleString('en-IN')}.00
          </p>
        </div>
      </div>

      {/* 3. INTERACTIVE CTA */}
      <div className="pt-2 z-10">
        <button 
          onClick={handleAddToCartClick}
          disabled={stock === 0}
          className={`w-full mt-2 font-sans text-[11px] font-medium uppercase tracking-widest py-2.5 transition-colors duration-300 border-none rounded-lg ${
            stock === 0 
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
              : 'bg-essaara-earth text-white hover:bg-essaara-gold cursor-pointer'
          }`}
        >
          {stock === 0 ? 'Out of Stock' : 'Add to Bag'}
        </button>
      </div>

    </Link>
  );
};

export default ProductCard;
