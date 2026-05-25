import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useCart();

  // Find the matching product from our unified state pool
  const product = products.find((p) => p.id === productId || p._id === productId);

  // Active accordion tab state tracking
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (product.stock && next > product.stock) return product.stock;
      return next;
    });
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      // Assuming addToCart might be adapted to take a quantity, or we loop
      for(let i=0; i<quantity; i++){
        addToCart(product.id || product._id, null);
      }
    }
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <main className="w-full bg-[#FAF9F6] min-h-screen py-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto animate-fadeIn">
      
      {/* BREADCRUMBS */}
      <div className="mb-8">
        <nav className="font-sans text-[11px] uppercase tracking-widest text-neutral-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-800">{product.name}</span>
        </nav>
      </div>

      {/* TWO-COLUMN MASTER BREADCRUMB GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
        
        {/* =========================================================================
            LEFT ROW SYSTEM: MEDIA SHOWCASE PANEL
            ========================================================================= */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full aspect-square overflow-hidden flex items-center justify-center group">
            <img 
              src={product.productImages ? product.productImages[0] : (product.images?.[0])} 
              alt={product.name} 
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-102"
            />
          </div>
        </div>

        {/* =========================================================================
            RIGHT ROW SYSTEM: PRODUCT SPECS & ACTION CONTROLS
            ========================================================================= */}
        <div className="flex flex-col h-full justify-start pt-2">
          
          {/* Sub-category tracking marker */}
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-amber-800 mb-3">
            {product.subCategory || product.category || 'BATH & BODY'}
          </span>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2C3B32] font-light mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-sans text-xl text-[#2C3B32]">
              ₹{product.price ? product.price.toLocaleString('en-IN') : (product.variants?.[0]?.price || 0).toLocaleString('en-IN')}.00
            </span>
          </div>

          <p className="font-sans text-sm text-neutral-600 font-light mb-10 leading-relaxed pr-8">
            {product.description || product.tagline || `A fizzing terracotta-and-gold bath bomb infused with rose, sandalwood and almond oil. Turns your bath into a slow, scented ritual that softens skin and quiets the mind. Hand-poured. 100% herbal & vegan. ${product.netWt || '120g'}.`}
          </p>

          {/* MASTER ACTIONS PURCHASE CONTAINER */}
          <div className="mb-10 w-full flex items-center gap-4">
            
            <div className="flex items-center border border-neutral-300">
              <button 
                onClick={() => handleQuantityChange(-1)} 
                className="px-4 py-3 text-neutral-500 hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer"
                disabled={isOutOfStock}
              >
                −
              </button>
              <span className="font-sans text-xs w-8 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)} 
                className="px-4 py-3 text-neutral-500 hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer"
                disabled={isOutOfStock}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 font-sans text-xs font-bold uppercase tracking-widest py-4 px-6 transition-all duration-300 ${
                isOutOfStock
                  ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed text-center'
                  : 'bg-[#1E2E23] text-white hover:bg-black cursor-pointer'
              }`}
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </button>
            
          </div>

          {/* Quick stock warning indicator */}
          {!isOutOfStock && product.stock <= 15 && (
            <p className="text-[11px] font-sans text-amber-700 mb-8 font-medium tracking-wide">
              ⚠️ Low Stock Alert: Only {product.stock} units remaining.
            </p>
          )}

          {/* =========================================================================
              ACCORDION COMPONENT SYSTEM
              ========================================================================= */}
          <div className="w-full flex flex-col border-t border-neutral-200 pt-4 gap-4">
            
            {/* Description Accordion */}
            <div className="border-b border-neutral-200 pb-4">
              <button 
                onClick={() => toggleAccordion('description')}
                className="w-full flex justify-between items-center py-2 text-left cursor-pointer group"
              >
                <span className="font-serif text-[11px] tracking-[0.2em] uppercase text-neutral-800">
                  Description & Philosophy
                </span>
                <span className="text-neutral-400 group-hover:text-black transition-colors">
                  {activeAccordion === 'description' ? '−' : '+'}
                </span>
              </button>
              {activeAccordion === 'description' && (
                <div className="pt-4 text-sm font-sans text-neutral-600 font-light leading-relaxed animate-fadeIn">
                   {product.description || product.tagline}
                </div>
              )}
            </div>

            {/* Ingredients Accordion */}
            <div className="border-b border-neutral-200 pb-4">
              <button 
                onClick={() => toggleAccordion('ingredients')}
                className="w-full flex justify-between items-center py-2 text-left cursor-pointer group"
              >
                <span className="font-serif text-[11px] tracking-[0.2em] uppercase text-neutral-800">
                  Ingredients
                </span>
                <span className="text-neutral-400 group-hover:text-black transition-colors">
                  {activeAccordion === 'ingredients' ? '−' : '+'}
                </span>
              </button>
              {activeAccordion === 'ingredients' && (
                <div className="pt-4 animate-fadeIn flex flex-wrap gap-2">
                  {product.ingredients?.map((item, idx) => (
                    <span key={idx} className="bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px] font-sans tracking-wide px-3 py-1.5 rounded-sm">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* How To Use Accordion */}
            <div className="border-b border-neutral-200 pb-4">
              <button 
                onClick={() => toggleAccordion('how-to-use')}
                className="w-full flex justify-between items-center py-2 text-left cursor-pointer group"
              >
                <span className="font-serif text-[11px] tracking-[0.2em] uppercase text-neutral-800">
                  How To Use
                </span>
                <span className="text-neutral-400 group-hover:text-black transition-colors">
                  {activeAccordion === 'how-to-use' ? '−' : '+'}
                </span>
              </button>
              {activeAccordion === 'how-to-use' && (
                <div className="pt-4 text-sm font-sans text-neutral-600 font-light leading-relaxed animate-fadeIn">
                  <ol className="list-decimal pl-4">
                    {product.howToUse?.map((step, idx) => (
                      <li key={idx} className="mb-2 pl-1">{step}</li>
                    ))}
                  </ol>
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
