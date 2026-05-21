import React from 'react';
import ProductCard from './ProductCard';
import { mockProducts } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';

const BestsellerGrid = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (productId, selectedVariant) => {
    // Find the original raw data item reference from your local list
    const productData = mockProducts.find(p => p._id === productId);
    if (productData) {
      addToCart(productData, selectedVariant); // Push item cleanly into context
    }
  };

  const handleAddToWishlist = (productId) => {
    console.log(`Toggling product ${productId} in wishlist`);
    // Future: AuthContext.toggleWishlist(productId) logic goes here
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      
      {/* SECTION HEADER BLOCK */}
      <div className="flex justify-between items-baseline border-b border-neutral-100 pb-4 mb-8">
        <h2 className="font-serif text-xl md:text-2xl tracking-widest text-essaara-earth uppercase">
          Seasonal Indulgences
        </h2>
        
        <a 
          href="/collections/all" 
          className="font-sans text-[11px] font-bold tracking-widest text-essaara-earth uppercase flex items-center gap-1 hover:text-essaara-gold transition-colors duration-300 group"
        >
          View All 
          <span className="transform group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </a>
      </div>

      {/* RESPONSIVE GRID LAYOUT */}
      {/* 2 columns on mobile, 3 on tablet, 4 on desktop screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {mockProducts.map((product) => (
          <ProductCard 
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        ))}
      </div>

    </section>
  );
};

export default BestsellerGrid;
