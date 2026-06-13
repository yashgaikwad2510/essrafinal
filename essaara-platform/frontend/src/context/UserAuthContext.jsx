import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const UserAuthContext = createContext();

export const useUserAuth = () => useContext(UserAuthContext);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo && userInfo !== 'undefined') {
        setUser(JSON.parse(userInfo));
      } else {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userToken');
      }
    } catch (e) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.post('/users/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      // Store token for storefront API calls
      localStorage.setItem('userToken', data.token);
      return data;
    } catch (error) {
      throw error.message === 'Invalid email or password' 
        ? 'Incorrect email or password. Please try again.' 
        : (error.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.post('/users/register', userData);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('userToken', data.token);
      return data;
    } catch (error) {
      throw error.message === 'User already exists' 
        ? 'This email is already registered. Please click Log In below.' 
        : (error.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
  };

  return (
    <UserAuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </UserAuthContext.Provider>
  );
};
