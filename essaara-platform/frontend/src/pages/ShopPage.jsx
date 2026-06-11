import React, { useState } from 'react';
import { Link } from 'react-router-dom';



import { useCart } from '../context/CartContext';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeRitualProduct, setActiveRitualProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // "newest", "price-low", "price-high"
  const { products, addToCart, loading, error } = useCart();

  const categories = [
    { id: "All", label: "All" },
    { id: "bath-body", label: "Snan (Bath)" },
    { id: "candles", label: "Elements (Home)" },
    { id: "fragrance", label: "Scent (Aroma)" }
  ];

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 (p.ingredients && p.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0; // "newest" or default
    });

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <p className="font-sans text-xs uppercase tracking-widest text-neutral-400">Loading Collection...</p>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto text-neutral-900 font-sans">
      
      {/* HEADER PANEL */}
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-amber-900/80 block mb-2">
          Purely Ayurvedic • Naturally Divine
        </span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.15em] font-light text-neutral-950">
          The Storefront Collection
        </h1>
        <div className="w-12 h-[1px] bg-neutral-200 mx-auto mt-4" />
      </div>

      {/* SEARCH AND SORT BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by product or ingredient..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200 py-3 pl-10 pr-4 rounded-full text-xs outline-hidden focus:border-amber-900/30 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Sort By:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none text-xs font-bold uppercase tracking-widest text-neutral-900 outline-hidden cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex justify-center gap-6 md:gap-8 border-b border-neutral-100 pb-4 mb-12 text-[11px] font-bold tracking-widest uppercase overflow-x-auto whitespace-nowrap scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setActiveRitualProduct(null);
            }}
            className={`pb-2 transition-all cursor-pointer bg-transparent border-none ${
              selectedCategory === cat.id 
                ? "text-neutral-950 border-b-2 border-neutral-950 font-black" 
                : "text-neutral-400 hover:text-neutral-950"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* REPLICATED SHOP GRID FROM DESIGN image_552988.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
        {filteredProducts.map((product) => {
          const isSelected = activeRitualProduct?.id === product.id;
          
          return (
            <div key={product.id} className="w-full flex flex-col">
              
              {/* THE EXACT CARD TEMPLATE FRAME */}
              <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl flex flex-col text-left shadow-xs transition-shadow hover:shadow-md">
                
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
                    <Link to={`/product/${product.id || product._id}`} className="absolute inset-0 w-full h-full z-10">
                      <img 
                        src={product.productImages[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </Link>
                  ) : (
                    /* Placeholder Art Monogram Layer */
                    <Link to={`/product/${product.id || product._id}`} className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-neutral-50 to-[#FAF7F2] z-10 hover:text-black">
                      <span className="font-serif text-4xl font-extralight text-neutral-200/80 tracking-widest">
                        E
                      </span>
                      <p className="text-[9px] font-sans uppercase tracking-widest text-neutral-400/80 max-w-[85%] mt-2 leading-relaxed">
                        {product.name}
                      </p>
                    </Link>
                  )}
                </div>

                {/* PRODUCT TITLE - UPPERCASE WITH TRUNCATION */}
                <Link to={`/product/${product.id || product._id}`} className="no-underline text-neutral-900 hover:text-black block mb-1">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider truncate">
                    {product.name}
                  </h3>
                </Link>

                {/* TAGLINE OVERLAY - LIGHT GREY UPPERCASE */}
                <p className="font-sans text-[10px] text-neutral-400 uppercase tracking-wide font-normal truncate mb-4">
                  {product.tagline}
                </p>

                {/* WEIGHT & PRICE MATRIX ROW */}
                <div className="flex justify-between items-center text-left mb-5 pt-1 border-t border-neutral-50">
                  <span className="font-sans text-[11px] text-neutral-400 font-light">
                    {product.netWt}
                  </span>
                  <span className="font-sans text-xs font-bold text-neutral-950">
                    ₹{product.price}.00
                  </span>
                </div>

                {/* FULL-WIDTH ANCHORED ACTION BUTTON */}
                <button 
                  onClick={() => { if (product.stock > 0) addToCart(product.id, null) }}
                  disabled={product.stock === 0}
                  className={`w-full text-[10px] font-bold uppercase tracking-[0.2em] py-3.5 rounded-lg transition-colors shadow-sm mt-auto border-none ${
                    product.stock === 0 
                      ? "bg-neutral-300 text-neutral-500 cursor-not-allowed" 
                      : "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                  }`}
                >
                  {product.stock === 0 ? "Sold Out" : "Move To Bag"}
                </button>

              </div>

              {/* OPTIONAL EXPANDED DISCLOSURE SECTION */}
              {isSelected && (
                <div className="w-full bg-[#FAF8F3] border border-amber-900/10 rounded-xl p-5 mt-3 text-left animate-slideDown shadow-inner">
                  <div className="mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-0.5">Ingredients</span>
                    <p className="text-[11px] text-neutral-700 font-light leading-relaxed">{Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients}</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">The Sacred Ritual</span>
                    <ol className="list-decimal list-inside text-[11px] text-neutral-700 font-light flex flex-col gap-1 leading-relaxed">
                      {product.howToUse?.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </main>
  );
};

export default ShopPage;
