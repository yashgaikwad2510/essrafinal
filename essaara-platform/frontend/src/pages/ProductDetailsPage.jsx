import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useCart();

  // Find the matching product from our unified state pool
  const product = products.find((p) => p.id === productId);

  // Active accordion tab state tracking
  const [activeTab, setActiveTab] = useState(null);
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

  const toggleAccordion = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product.id, null);
      }
    }
  };

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-xs font-sans text-neutral-500">
          <Link to="/" className="hover:text-neutral-800 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-neutral-800 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-neutral-800">{product.name}</span>
        </nav>
      </div>

      {/* TWO-COLUMN MASTER PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: PRODUCT IMAGE
              ========================================================================= */}
          <div className="w-full">
            <div className="w-full aspect-square bg-[#FAF9F6] rounded-lg overflow-hidden flex items-center justify-center sticky top-24">
              {product.productImages?.[0] ? (
                <img 
                  src={product.productImages[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-neutral-300">
                  <span className="font-serif text-6xl font-extralight tracking-widest">E</span>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PRODUCT INFORMATION & PURCHASE
              ========================================================================= */}
          <div className="flex flex-col">
            
            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-sm">
                {product.subCategory}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <span className="font-sans text-2xl font-semibold text-neutral-900">
                €{product.price.toFixed(2)}
              </span>
            </div>

            {/* Product Description */}
            <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-8">
              {product.tagline}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-sm hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="text-lg font-light">−</span>
              </button>
              <span className="font-sans text-base font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-sm hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="text-lg font-light">+</span>
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full font-sans text-sm font-semibold uppercase tracking-wider py-4 rounded-sm transition-all duration-300 mb-4 ${
                isOutOfStock
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-[#2C5F4E] text-white hover:bg-[#234a3d]'
              }`}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {/* Stock Warning */}
            {!isOutOfStock && product.stock <= 15 && (
              <p className="text-xs font-sans text-amber-700 mb-6 font-medium">
                Only {product.stock} left in stock
              </p>
            )}

            {/* Product Details Accordion */}
            <div className="border-t border-neutral-200 mt-8">
              
              {/* Description & Philosophy Accordion */}
              <div className="border-b border-neutral-200">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    Description & Philosophy
                  </span>
                  <span className={`text-xl transition-transform duration-300 ${activeTab === 'description' ? 'rotate-180' : ''}`}>
                    {activeTab === 'description' ? '−' : '+'}
                  </span>
                </button>
                {activeTab === 'description' && (
                  <div className="pb-6 animate-fadeIn">
                    <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-4">
                      {product.tagline}
                    </p>
                    <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                      Hand-poured. 100% herbal & vegan. {product.netWt}
                    </p>
                  </div>
                )}
              </div>

              {/* Ingredients Accordion */}
              <div className="border-b border-neutral-200">
                <button
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    Ingredients
                  </span>
                  <span className={`text-xl transition-transform duration-300 ${activeTab === 'ingredients' ? 'rotate-180' : ''}`}>
                    {activeTab === 'ingredients' ? '−' : '+'}
                  </span>
                </button>
                {activeTab === 'ingredients' && (
                  <div className="pb-6 animate-fadeIn">
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients?.map((item, idx) => (
                        <span key={idx} className="bg-neutral-100 text-neutral-700 text-xs font-sans px-3 py-1.5 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* How to Use Accordion */}
              <div className="border-b border-neutral-200">
                <button
                  onClick={() => toggleAccordion('howToUse')}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    How to Use
                  </span>
                  <span className={`text-xl transition-transform duration-300 ${activeTab === 'howToUse' ? 'rotate-180' : ''}`}>
                    {activeTab === 'howToUse' ? '−' : '+'}
                  </span>
                </button>
                {activeTab === 'howToUse' && (
                  <div className="pb-6 animate-fadeIn">
                    <ol className="list-decimal list-inside space-y-2 font-sans text-sm text-neutral-600">
                      {product.howToUse?.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Safety & Details Accordion */}
              <div className="border-b border-neutral-200">
                <button
                  onClick={() => toggleAccordion('safety')}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    Safety & Details
                  </span>
                  <span className={`text-xl transition-transform duration-300 ${activeTab === 'safety' ? 'rotate-180' : ''}`}>
                    {activeTab === 'safety' ? '−' : '+'}
                  </span>
                </button>
                {activeTab === 'safety' && (
                  <div className="pb-6 animate-fadeIn">
                    <div className="space-y-3 font-sans text-sm text-neutral-600">
                      <p>
                        <span className="font-semibold text-neutral-800 block mb-1">Shelf Life:</span>
                        {product.expiry}
                      </p>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {product.otherInfo}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

    </main>
  );
};

export default ProductDetailsPage;
