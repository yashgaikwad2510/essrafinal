import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; // Pull directly from the global state loop

const BestsellerGrid = () => {
  const { products, addToCart } = useCart(); // Destructure our global, reactive arrays
  const [activeRitualProduct, setActiveRitualProduct] = useState(null);

  // Helper to clean up any citation tags from string data
  const cleanText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\[cite:\s*\d+\]/gi, '').trim();
  };

  return (
    <section className="w-full bg-white py-12 px-6 max-w-7xl mx-auto">
      <h2 className="font-serif text-xl md:text-2xl tracking-widest uppercase text-center mb-10 text-neutral-950">
        Bestselling Rituals
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => {
          const isSelected = activeRitualProduct?.id === product.id;
          const isOutOfStock = product.stock === 0;

          return (
            <div key={product.id} className="w-full flex flex-col">
              
              {/* THE EXACT CARD TEMPLATE FRAME */}
              <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl flex flex-col text-left shadow-xs transition-shadow hover:shadow-md h-full">
                
                {/* 1:1 SQUARE IMAGE WINDOW */}
                <div className="w-full aspect-square bg-[#FAF9F6] relative rounded-xl overflow-hidden flex items-center justify-center p-6 mb-5">
                  
                  {/* Floating Top Right Dismiss/Action Cross Icon */}
                  <button 
                    onClick={() => setActiveRitualProduct(isSelected ? null : product)}
                    className="absolute top-2.5 right-2.5 text-neutral-300 hover:text-neutral-600 transition-colors bg-transparent border-none text-base cursor-pointer z-20"
                  >
                    ✕
                  </button>

                  {product.productImages?.[0] ? (
                    <img 
                      src={product.productImages[0]} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  ) : (
                    /* Placeholder Art Monogram Layer */
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-neutral-50 to-[#FAF7F2]">
                      <span className="font-serif text-4xl font-extralight text-neutral-200/80 tracking-widest">
                        E
                      </span>
                      <p className="text-[9px] font-sans uppercase tracking-widest text-neutral-400/80 max-w-[85%] mt-2 leading-relaxed">
                        {product.name}
                      </p>
                    </div>
                  )}
                </div>

                {/* PRODUCT TITLE - UPPERCASE WITH TRUNCATION */}
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 truncate mb-1">
                  {product.name}
                </h3>

                {/* TAGLINE OVERLAY - LIGHT GREY UPPERCASE */}
                <p className="font-sans text-[10px] text-neutral-400 uppercase tracking-wide font-normal truncate mb-4">
                  {cleanText(product.tagline)}
                </p>

                {/* WEIGHT & PRICE MATRIX ROW */}
                <div className="flex justify-between items-center text-left mb-5 pt-1 border-t border-neutral-50">
                  <span className="font-sans text-[11px] text-neutral-400 font-light">
                    {cleanText(product.netWt)}
                  </span>
                  <span className="font-sans text-xs font-bold text-neutral-950">
                    ₹{product.price.toLocaleString('en-IN')}.00
                  </span>
                </div>

                {/* FULL-WIDTH ANCHORED ACTION BUTTON */}
                <button 
                  onClick={() => !isOutOfStock && addToCart(product.id, null)}
                  disabled={isOutOfStock}
                  className={`w-full text-white text-[10px] font-bold uppercase tracking-[0.2em] py-3.5 transition-colors shadow-sm cursor-pointer border-none mt-auto rounded-lg ${
                    isOutOfStock
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      : 'bg-black hover:bg-neutral-900'
                  }`}
                >
                  {isOutOfStock ? 'Sold Out' : 'Add To Bag'}
                </button>

              </div>

              {/* OPTIONAL EXPANDED DISCLOSURE SECTION */}
              {isSelected && (
                <div className="w-full bg-[#FAF8F3] border border-amber-900/10 rounded-xl p-5 mt-3 text-left animate-slideDown shadow-inner">
                  <div className="mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-0.5">Ingredients</span>
                    <p className="text-[11px] text-neutral-700 font-light leading-relaxed">
                      {Array.isArray(product.ingredients) ? product.ingredients.map(cleanText).join(', ') : cleanText(product.ingredients)}
                    </p>
                  </div>
                  <div className="mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">The Sacred Ritual</span>
                    <ol className="list-decimal list-inside text-[11px] text-neutral-700 font-light flex flex-col gap-1 leading-relaxed">
                      {product.howToUse.map((step, idx) => (
                        <li key={idx}>{cleanText(step)}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestsellerGrid;
