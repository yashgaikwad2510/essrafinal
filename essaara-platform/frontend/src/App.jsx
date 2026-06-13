import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserAuthProvider } from './context/UserAuthContext';

// Global Layout Framework Shells
import Navbar from './components/common/Navbar';
import CartDrawer from './components/cart/CartDrawer';
import Footer from './components/common/Footer';
import FloatingReel from './components/shared/FloatingReel';
import AnnouncementBar from './components/shared/AnnouncementBar';

// Core Application Pages Layouts
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <UserAuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between relative selection:bg-amber-100">
            
            <div>
              {/* Announcement Offer Bar Ticker */}
              <AnnouncementBar />

              {/* Global Sticky Navigation Header */}
              <Navbar />

              {/* Core Application Page Routing Tree Switchboard */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:productId" element={<ProductDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/cart-checkout" element={<CheckoutPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/account" element={<AccountPage />} />
              </Routes>
            </div>

            {/* Global Slide-Over Utility Drawers */}
            <CartDrawer />

            {/* Global Botanical-Accent Footer Component */}
            <Footer />

            {/* Shoppable Reel Video PIP widget */}
            <FloatingReel />
            
          </div>
        </BrowserRouter>
      </CartProvider>
    </UserAuthProvider>
  );
}

export default App;
