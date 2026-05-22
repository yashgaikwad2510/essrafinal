import React from 'react';
import { useCart } from '../../context/CartContext'; // Pull directly from the global state loop

const BestsellerGrid = () => {
  const { products, addToCart } = useCart(); // Destructure our global, reactive arrays

  return (
    <section className="w-full bg-white py-12 px-6 max-w-7xl mx-auto">
      <h2 className="font-serif text-xl md:text-2xl tracking-widest uppercase text-center mb-10">
        Bestselling Rituals
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isOutOfStock = product.stock === 0;

          return (
            <div key={product.id} className="flex flex-col text-left group">
              <div className="relative aspect-square w-full bg-[#FBFBFA] rounded-xs overflow-hidden border border-neutral-100 p-4">
                <img src={product.productImages[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                
                {/* Dynamically adjust visual controls based on stock data */}
                <button 
                  onClick={() => !isOutOfStock && addToCart(product.id, null)}
                  disabled={isOutOfStock}
                  className={`absolute bottom-3 left-3 right-3 border font-sans text-[10px] font-bold tracking-widest uppercase py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xs ${
                    isOutOfStock
                      ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-100'
                      : 'bg-white/90 text-black border-black hover:bg-black hover:text-white cursor-pointer'
                  }`}
                >
                  {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
                </button>
              </div>
              
              <h3 className="font-sans text-xs font-semibold mt-4 text-neutral-800 uppercase tracking-wider truncate">
                {product.name}
              </h3>
              <p className="font-sans text-[11px] text-neutral-400 mt-0.5">{product.netWt}</p>
              <p className="font-sans text-xs font-bold text-neutral-900 mt-2">
                ₹{product.price.toLocaleString('en-IN')}.00
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestsellerGrid;
