import React, { createContext, useContext, useEffect, useState } from 'react';
import { essaaraProducts } from '../data/products'; // Direct single source of truth!
import { fetchProducts } from '../lib/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Global single-source arrays
  const [products, setProducts] = useState(essaaraProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productError, setProductError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setIsLoadingProducts(true);
      setProductError('');

      try {
        const data = await fetchProducts();
        if (!isMounted) return;

        const normalizedProducts = data.products.map((product) => ({
          ...product,
          id: product.productId
        }));

        setProducts(normalizedProducts);
      } catch (error) {
        if (isMounted) {
          setProductError('Unable to refresh products. Showing saved catalog.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

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
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
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
    if (delta > 0 && targetProduct.stock === 0) return;

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

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      products, // Exposed globally! Components read directly from this reactive array
      isLoadingProducts,
      productError,
      cart, 
      isCartOpen, 
      setIsCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getSubtotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
