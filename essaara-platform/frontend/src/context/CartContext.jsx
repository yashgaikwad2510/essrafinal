import React, { createContext, useContext, useState, useEffect } from 'react';
import { essaaraProducts } from '../data/products'; // Direct single source of truth!

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('essaaraCart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/products`);
        if (!res.ok) throw new Error('Failed to fetch from backend');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.warn('Backend not available, falling back to local data:', err);
        setProducts(essaaraProducts);
        setError('Using local mock data');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('essaaraCart', JSON.stringify(cart));
  }, [cart]);

  // 1. GLOBAL ADD-TO-CART (Updates bag items and checks real inventory stock pools)
  const addToCart = (productId, selectedOption) => {
    // Find the master product row specs
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct || targetProduct.stock === 0) return; // Block out-of-stock additions

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === productId && item.option?.id === selectedOption?.id
      );

      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, { ...targetProduct, option: selectedOption, quantity: 1 }];
    });

    // 2. DYNAMIC STATE ADJUSTMENT: Deduct item from inventory state pool instantly
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setIsCartOpen(true);
  };

  // 3. GLOBAL QUANTITY COUNTER MODIFIER (Syncs inventory levels in reverse)
  const updateQuantity = (productId, optionId, delta) => {
    const targetProduct = products.find(p => p.id === productId);
    
    // If user is trying to add more, make sure we have enough inventory
    if (delta > 0 && targetProduct.stock < delta) return;

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId && item.option?.id === optionId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });

    // Sync inventory stock pools in reverse to reflect the checkout state change
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - delta } : p
      )
    );
  };

  // 4. GLOBAL REMOVE ITEM PIPELINE
  const removeFromCart = (productId, optionId, currentQuantity) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.option?.id === optionId))
    );

    // Return the items directly back to the global store stock pool
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + currentQuantity } : p
      )
    );
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      products, // Exposed globally! Components read directly from this reactive array
      cart, 
      isCartOpen, 
      setIsCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getSubtotal,
      clearCart,
      loading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
