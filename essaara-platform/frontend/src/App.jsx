import React from 'react';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Footer from './components/common/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-grow">
          <Home />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
