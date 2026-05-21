import React from 'react';
import ProductCard from './ProductCard';
import { mockProducts } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';

const ProductGrid = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (productId, selectedVariant) => {
    const productData = mockProducts.find(p => p._id === productId);
    addToCart({
      ...productData,
      price: selectedVariant.price,
      selectedVariant
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-12 py-16">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-serif text-essaara-earth">Signature Collection</h2>
        <a href="/shop" className="text-xs font-sans tracking-widest text-gray-500 uppercase hover:text-essaara-gold transition-colors border-b border-transparent hover:border-essaara-gold pb-1">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockProducts.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onAddToCart={handleAddToCart}
            onAddToWishlist={(id) => console.log('Wishlist toggled:', id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
