import React from 'react';
import Navbar from './components/common/Navbar';
import GiftingPage from './pages/GiftingPage';
import Footer from './components/common/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-grow">
          <GiftingPage />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
