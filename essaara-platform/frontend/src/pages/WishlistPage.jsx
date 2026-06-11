import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WishlistPage = () => {
  const { products, addToCart } = useCart();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user || !token) {
        setWishlistItems([]);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/auth/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlistItems(res.data);
      } catch (err) {
        console.error('Error fetching wishlist', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user, token]);

  const handleRemoveFromWishlist = async (id) => {
    if (!user || !token) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/auth/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(prev => prev.filter(item => (item.id || item._id) !== id));
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  const handleMoveToCart = (productId) => {
    addToCart(productId, null);
    handleRemoveFromWishlist(productId);
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center font-sans text-xs uppercase tracking-widest text-neutral-400">Loading Wishlist...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-serif text-2xl uppercase tracking-widest mb-2">Login Required</h2>
        <p className="text-xs text-neutral-500 max-w-sm mb-6 font-light">Please log in to view and save your favorite ritual botanicals.</p>
        <button onClick={() => navigate('/login')} className="font-sans text-xs font-bold tracking-widest uppercase bg-black text-white px-8 py-3.5 hover:bg-essaara-earth transition-colors">
          Log In
        </button>
      </div>
    );
  }

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
          const productId = product.id || product._id;

          return (
            <div key={productId} className="bg-white border border-neutral-200/60 rounded-2xl p-5 flex flex-col justify-between group transition-all hover:shadow-md relative">
              
              {/* Absoluted Position Close/Remove cross button */}
              <button 
                onClick={() => handleRemoveFromWishlist(productId)}
                className="absolute top-3 right-3 z-10 p-1 text-neutral-300 hover:text-red-700 cursor-pointer transition-colors"
                title="Remove from wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Visual Thumbnail Window Box */}
              <div 
                className="w-full aspect-square flex items-center justify-center p-6 mb-4 bg-[#FAF9F6] rounded-xl cursor-pointer overflow-hidden relative"
                onClick={() => navigate(`/product/${productId}`)}
              >
                <img 
                  src={product.productImages?.[0] || '/images/sope.png'} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply transform transition-transform duration-500 group-hover:scale-105 rounded-xl"
                />
              </div>

              {/* Descriptive Content Meta Block */}
              <div className="text-left flex flex-col flex-grow">
                <h3 
                  onClick={() => navigate(`/product/${productId}`)}
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
                    ₹{product.price?.toLocaleString('en-IN')}.00
                  </span>
                </div>
              </div>

              {/* Action Button: Push directly into Shopping Bag Context */}
              <button
                onClick={() => !isOutOfStock && handleMoveToCart(productId)}
                disabled={isOutOfStock}
                className={`w-full mt-4 font-sans text-[10px] font-bold uppercase tracking-widest py-2.5 transition-colors duration-300 rounded-lg border border-none ${
                  isOutOfStock
                    ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed text-center'
                    : 'bg-black text-white hover:bg-essaara-earth cursor-pointer'
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
