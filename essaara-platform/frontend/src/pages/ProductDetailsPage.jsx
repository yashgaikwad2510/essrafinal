import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useCart();

  // Find the matching product from our unified state pool
  const product = products.find((p) => p.id === productId);

  // Active accordion tab state tracking
  const [activeTab, setActiveTab] = useState('ingredients');

  // Fallback protection if user refreshes on an invalid product ID
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-serif text-xl uppercase tracking-widest text-neutral-800 mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="font-sans text-xs font-bold tracking-widest uppercase border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors cursor-pointer">
          Back To Shop
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <main className="w-full bg-white min-h-screen py-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto animate-fadeIn">
      
      {/* TWO-COLUMN MASTER BREADCRUMB GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
        
        {/* =========================================================================
            LEFT ROW SYSTEM: MEDIA SHOWCASE PANEL
            ========================================================================= */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full aspect-square bg-[#FBFBFA] border border-neutral-100 rounded-xs overflow-hidden p-8 flex items-center justify-center group">
            <img 
              src={product.productImages[0]} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain mix-blend-multiply transform transition-transform duration-500 group-hover:scale-102"
            />
          </div>
          
          {/* Quality Indicator Badges matching common labeling data */}
          <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-neutral-100 bg-[#FAF9F6]">
            <div className="flex flex-col py-1">
              <span className="font-sans text-[9px] uppercase tracking-widest font-bold text-neutral-800">Purely Ayurvedic</span>
            </div>
            <div className="flex flex-col py-1 border-x border-neutral-200/60">
              <span className="font-sans text-[9px] uppercase tracking-widest font-bold text-neutral-800">Naturally Divine</span>
            </div>
            <div className="flex flex-col py-1">
              <span className="font-sans text-[9px] uppercase tracking-widest font-bold text-neutral-800">Made In India</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT ROW SYSTEM: PRODUCT SPECS & ACTION CONTROLS
            ========================================================================= */}
        <div className="flex flex-col h-full justify-start pt-2">
          
          {/* Sub-category tracking marker */}
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800 mb-2">
            {product.subCategory}
          </span>

          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-neutral-900 uppercase tracking-wider font-light mb-2 leading-tight">
            {product.name}
          </h1>

          <p className="font-sans text-xs md:text-sm text-neutral-500 italic font-light tracking-wide mb-6 border-b border-neutral-50 pb-4 leading-relaxed">
            "{product.tagline}"
          </p>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-sans text-xl font-bold text-neutral-900">
              ₹{product.price.toLocaleString('en-IN')}.00 Packs
            </span>
            <span className="text-xs font-sans text-neutral-400 uppercase tracking-widest font-medium">
              | Net Wt: {product.netWt}
            </span>
          </div>

          {/* MASTER ACTIONS PURCHASE CONTAINER */}
          <div className="mb-10 w-full">
            <button
              onClick={() => !isOutOfStock && addToCart(product.id, null)}
              disabled={isOutOfStock}
              className={`w-full font-sans text-xs font-bold uppercase tracking-widest py-4 transition-all duration-300 rounded-xs border shadow-xs ${
                isOutOfStock
                  ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed text-center'
                  : 'bg-black text-white hover:bg-essaara-earth border-black hover:border-essaara-earth cursor-pointer'
              }`}
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
            </button>
            
            {/* Quick stock warning indicator */}
            {!isOutOfStock && product.stock <= 15 && (
              <p className="text-[11px] font-sans text-amber-700 mt-2.5 font-medium tracking-wide">
                ⚠️ Low Stock Alert: Only {product.stock} units remaining in our ritual vault.
              </p>
            )}
          </div>

          {/* =========================================================================
              TAB ACCORDION COMPONENT SYSTEM (Unpacks Document Meta Specs)
              ========================================================================= */}
          <div className="w-full flex flex-col border border-neutral-200/70 rounded-xs overflow-hidden bg-white">
            
            {/* Tab Header Selector Buttons Grid */}
            <div className="grid grid-cols-3 bg-[#FAF9F6] border-b border-neutral-200/70 text-center">
              <button 
                onClick={() => setActiveTab('ingredients')}
                className={`py-3.5 font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'ingredients' ? 'border-black text-black bg-white' : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Ingredients
              </button>
              <button 
                onClick={() => setActiveTab('how-to-use')}
                className={`py-3.5 font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'how-to-use' ? 'border-black text-black bg-white' : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                How To Use
              </button>
              <button 
                onClick={() => setActiveTab('safety')}
                className={`py-3.5 font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'safety' ? 'border-black text-black bg-white' : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Details
              </button>
            </div>

            {/* Content View Workspace Panel */}
            <div className="p-6 text-left min-h-[160px] flex flex-col justify-start">
              
              {/* TAB CONTENT A: ACCORDION INGREDIENTS */}
              {activeTab === 'ingredients' && (
                <div className="flex flex-wrap gap-2 animate-fadeIn">
                  {product.ingredients.map((item, idx) => (
                    <span key={idx} className="bg-neutral-50 border border-neutral-100 text-neutral-600 text-[11px] font-sans tracking-wide uppercase px-3 py-1.5 rounded-sm">
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* TAB CONTENT B: ACCORDION DIRECTIONS FOR USE */}
              {activeTab === 'how-to-use' && (
                <ol className="flex flex-col gap-3 font-sans text-xs text-neutral-600 leading-relaxed tracking-wide list-decimal pl-4 animate-fadeIn">
                  {product.howToUse.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              )}

              {/* TAB CONTENT C: EXPIRY & OTHER INFO LABELS */}
              {activeTab === 'safety' && (
                <div className="flex flex-col gap-3 text-xs font-sans text-neutral-600 leading-relaxed tracking-wide animate-fadeIn">
                  <p>
                    <span className="font-bold uppercase tracking-wider text-neutral-800 block mb-0.5">Shelf Life / Expiry:</span>
                    {product.expiry}
                  </p>
                  <div className="w-full h-[1px] bg-neutral-100 my-1" />
                  <p className="text-neutral-500 font-light whitespace-pre-line text-[11px]">
                    {product.otherInfo}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default ProductDetailsPage;
