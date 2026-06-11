import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Global Layout Framework Shells
import Navbar from './components/common/Navbar';
import CartDrawer from './components/cart/CartDrawer';
import Footer from './components/common/Footer';
import FloatingReel from './components/shared/FloatingReel';
import AnnouncementBar from './components/shared/AnnouncementBar';

// Core Application Pages Layouts (Lazy loaded)
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between relative selection:bg-amber-100">
          
          <div>
            {/* Announcement Offer Bar Ticker */}
            <AnnouncementBar />

            {/* Global Sticky Navigation Header */}
            <Navbar />

            {/* Core Application Page Routing Tree Switchboard */}
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
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
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
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
  );
}

export default App;
