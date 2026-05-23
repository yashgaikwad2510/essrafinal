import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { products, addToCart } = useCart();
  const navigate = useNavigate();

  // Mock initial items using the first two products in the unified array for visualization
  const [wishlistItems, setWishlistItems] = useState([
    products[0],
    products[1]
  ].filter(Boolean)); 

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveToCart = (productId) => {
    addToCart(productId, null);
    handleRemoveFromWishlist(productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 text-essaara-earth">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-neutral-300 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <h2 className="font-serif text-2xl uppercase tracking-widest mb-2">Your Wishlist is Empty</h2>
        <p className="text-xs text-neutral-500 max-w-sm mb-6 font-light">Bookmark your favorite ritual botanicals to save them in your personal sanctuary.</p>
        <button onClick={() => navigate('/shop')} className="font-sans text-xs font-bold tracking-widest uppercase border border-black bg-black text-white px-8 py-3.5 hover:bg-transparent hover:text-black transition-colors cursor-pointer">
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto animate-fadeIn text-essaara-earth">
      
      {/* PAGE HEADER */}
      <div className="text-center mb-12">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-amber-800 block mb-2">
          Saved Favorites
        </span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light mb-3">
          Your Personal Sanctuary
        </h1>
        <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
      </div>

      {/* WISHLIST GRID GRID TRACK */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => {
          const isOutOfStock = product.stock === 0;

          return (
            <div key={product.id} className="bg-white border border-neutral-200/60 rounded-xs p-4 flex flex-col justify-between group transition-all hover:shadow-md relative">
              
              {/* Absoluted Position Close/Remove cross button */}
              <button 
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="absolute top-3 right-3 z-10 p-1 text-neutral-300 hover:text-red-700 cursor-pointer transition-colors"
                title="Remove from wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Visual Thumbnail Window Box */}
              <div 
                className="w-full aspect-square flex items-center justify-center p-2 mb-4 bg-[#FBFBFA] rounded-xs cursor-pointer overflow-hidden"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img 
                  src={product.productImages[0]} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply transform transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              {/* Descriptive Content Meta Block */}
              <div className="text-left flex flex-col flex-grow">
                <h3 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="font-sans text-xs font-semibold uppercase tracking-wider truncate text-neutral-800 hover:text-amber-800 cursor-pointer transition-colors"
                >
                  {product.name}
                </h3>
                <p className="font-sans text-[10px] text-neutral-400 mt-0.5 tracking-wide uppercase line-clamp-1">
                  {product.tagline}
                </p>
                
                <div className="flex items-baseline justify-between mt-auto pt-3 border-t border-neutral-50">
                  <span className="font-sans text-[10px] text-neutral-400 font-medium">
                    {product.netWt}
                  </span>
                  <span className="font-sans text-xs font-bold text-neutral-900">
                    ₹{product.price.toLocaleString('en-IN')}.00
                  </span>
                </div>
              </div>

              {/* Action Button: Push directly into Shopping Bag Context */}
              <button
                onClick={() => !isOutOfStock && handleMoveToCart(product.id)}
                disabled={isOutOfStock}
                className={`w-full mt-4 font-sans text-[10px] font-bold uppercase tracking-widest py-2.5 transition-colors duration-300 rounded-xs border ${
                  isOutOfStock
                    ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed text-center'
                    : 'bg-black text-white border-black hover:bg-essaara-earth hover:border-essaara-earth cursor-pointer'
                }`}
              >
                {isOutOfStock ? 'Sold Out' : 'Move to Bag'}
              </button>

            </div>
          );
        })}
      </div>

    </main>
  );
};

export default WishlistPage;
