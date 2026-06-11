import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getSubtotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
          <h2 className="font-serif text-xl tracking-widest uppercase">Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-2xl cursor-pointer">&times;</button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <p className="text-center text-neutral-500 font-sans text-sm mt-10">Your bag is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 border-b border-neutral-100 pb-4">
                <img src={item.productImages?.[0]} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="flex flex-col flex-grow">
                  <h3 className="font-sans text-xs font-bold uppercase">{item.name}</h3>
                  <p className="font-sans text-[11px] text-neutral-500">{item.netWt}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <p className="font-sans text-xs font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-neutral-200">
                        <button onClick={() => updateQuantity(item.id, item.option?.id, -1)} className="px-2 py-1 text-xs cursor-pointer">-</button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.option?.id, 1)} className="px-2 py-1 text-xs cursor-pointer">+</button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id, item.option?.id, item.quantity)}
                        className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 hover:text-red-700 underline pl-1.5 cursor-pointer transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-100 bg-neutral-50">
            <div className="flex justify-between items-center mb-4 font-sans font-bold">
              <span>Subtotal</span>
              <span>₹{getSubtotal().toLocaleString('en-IN')}</span>
            </div>
            <Link 
              to="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-black text-white py-3 uppercase tracking-widest text-xs font-bold cursor-pointer no-underline"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
