import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Global State Containers for Authentication
  const [user, setUser] = useState(null);           // Tracks if user is logged in & profile data
  const [wishlist, setWishlist] = useState([]);     // Tracks personal wishlist
  const [addresses, setAddresses] = useState([]);   // Tracks saved shipping addresses

  // Placeholder actions
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = {
    user,
    wishlist,
    addresses,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
