import React, { createContext, useContext, useState, useEffect } from 'react';

// Initialize the Context
const CartContext = createContext();

// Define our premium business thresholds
const FREE_SHIPPING_THRESHOLD = 3000; // Free shipping on orders above ₹3,000

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [amountToFreeShipping, setAmountToFreeShipping] = useState(FREE_SHIPPING_THRESHOLD);

  // Automatically recalculate running totals whenever the cart state changes
  useEffect(() => {
    // 1. Calculate total price of items in bag
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);

    // 2. Evaluate luxury shipping rules
    if (total === 0) {
      setShippingCost(0);
      setAmountToFreeShipping(FREE_SHIPPING_THRESHOLD);
    } else if (total >= FREE_SHIPPING_THRESHOLD) {
      setShippingCost(0); // Free Shipping achieved
      setAmountToFreeShipping(0);
    } else {
      setShippingCost(150); // Flat standard rate under threshold
      setAmountToFreeShipping(FREE_SHIPPING_THRESHOLD - total);
    }
  }, [cart]);

  // Action Handler: Add Item or Increment existing matching variant
  const addToCart = (product, selectedVariant) => {
    setCart((prevCart) => {
      // Check if this specific item ID AND specific size combination already exists
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id && item.size === selectedVariant.size
      );

      if (existingItemIndex > -1) {
        // Increment quantity of existing match
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      // Append brand new item configuration to selection array
      return [
        ...prevCart,
        {
          _id: product._id,
          name: product.name,
          image: product.images[0],
          size: selectedVariant.size,
          price: selectedVariant.price,
          quantity: 1,
        },
      ];
    });
  };

  // Action Handler: Modify item count safely from Cart UI drawers
  const updateQuantity = (productId, size, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === productId && item.size === size) {
            const updatedQty = item.quantity + amount;
            return { ...item, quantity: updatedQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Automatically drop item if count drops to 0
    );
  };

  // Action Handler: Instant wipeout of a line item
  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item._id === productId && item.size === size))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      shippingCost,
      amountToFreeShipping,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for ultra-clean clean consumption across components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider wrapper');
  }
  return context;
};
