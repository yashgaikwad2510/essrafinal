import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import GiftingPage from './pages/GiftingPage';
import CategoryPage from './pages/CategoryPage';
import NewsletterAndStoreCTA from './components/home/NewsletterAndStoreCTA';
import Footer from './components/common/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
          <Navbar />
          <div className="flex-grow pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/gifting" element={<GiftingPage />} />
              <Route path="/gifting" element={<GiftingPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
            </Routes>
          </div>
          <NewsletterAndStoreCTA />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
