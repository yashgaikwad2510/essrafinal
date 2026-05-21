import React from 'react';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <Home />
      </div>
    </AuthProvider>
  );
}

export default App;
