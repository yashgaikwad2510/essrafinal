import React from 'react';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen">
          <Navbar />
          <Home />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
