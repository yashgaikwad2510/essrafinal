import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Global State Containers
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Dynamic Shipping Configuration
  const FREE_SHIPPING_THRESHOLD = 2000;

  // The Dispatch Action: User clicks "Add to Cart"
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Trigger Slide Open CartDrawer UI
    setIsCartOpen(true);
  };

  // Recalculates Total Order Amount dynamically
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Is Total >= Free Shipping Threshold?
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const qualifiesForFreeShipping = amountUntilFreeShipping === 0;

  const value = {
    cartItems,
    addToCart,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    amountUntilFreeShipping,
    qualifiesForFreeShipping,
    FREE_SHIPPING_THRESHOLD
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
