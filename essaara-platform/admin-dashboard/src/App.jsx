import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { PackagePlus, LayoutDashboard, Settings, LogOut, Package, ShoppingBag, Truck } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminAddProductPage from './pages/AdminAddProductPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import LoginPage from './pages/LoginPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminDashboardOverview from './pages/AdminDashboardOverview';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminShipmentsPage from './pages/AdminShipmentsPage';

const ProtectedRoute = ({ children }) => {
  const { admin } = useAuth();
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// A simple placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-full">
    <h2 className="text-2xl text-neutral-400 font-light">{title} (Coming Soon)</h2>
  </div>
);

const SidebarItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        isActive 
          ? 'bg-amber-100 text-amber-900 font-medium' 
          : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
      }`}
    >
      <Icon size={20} className={isActive ? "text-amber-700" : ""} />
      <span>{label}</span>
    </Link>
  );
};

const AdminLayout = ({ children }) => {
  const { logout, admin } = useAuth();
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] transition-colors text-sm ${
          isActive 
            ? 'bg-white/10 text-white font-medium' 
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`}
      >
        <Icon size={16} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-[#0f4c3a] px-8 py-4 flex justify-between items-center relative z-20 border-b border-white/5">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 text-white font-bold text-xl tracking-wide">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center -rotate-12 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-12"></div>
            </div>
            TalentaSync {/* Using TalentaSync to match the design requested, or you can use Essaara */}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/orders" icon={ShoppingBag} label="Orders" />
            <NavItem to="/shipments" icon={Truck} label="Shipments" />
            <NavItem to="/products" icon={Package} label="Products" />
            <NavItem to="/products/new" icon={PackagePlus} label="Add Product" />
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <button className="w-10 h-10 rounded-full bg-white/5 text-white/90 flex items-center justify-center hover:bg-white/10 transition-colors">
            <Settings size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 text-white/90 flex items-center justify-center hover:bg-white/10 transition-colors relative">
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full"></div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <div className="flex items-center gap-3 pl-2 cursor-pointer group" onClick={logout}>
            <div className="text-right hidden lg:block">
              <div className="text-sm font-bold text-white">{admin?.email?.split('@')[0] || 'Kennedy Jones'}</div>
              <div className="text-[11px] text-white/60">Product Manager</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-500 overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-colors">
              <img src={`https://ui-avatars.com/api/?name=${admin?.email || 'Kennedy Jones'}&background=f97316&color=fff`} alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col overflow-y-auto">
        <div className={`flex-1 flex flex-col ${location.pathname === '/' ? '' : 'p-8 pb-20'}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboardOverview />} />
                  <Route path="/orders" element={<AdminOrdersPage />} />
                  <Route path="/shipments" element={<AdminShipmentsPage />} />
                  <Route path="/products" element={<AdminProductsPage />} />
                  <Route path="/products/new" element={<AdminAddProductPage />} />
                  <Route path="/products/edit/:productId" element={<AdminEditProductPage />} />
                  <Route path="/settings" element={<PlaceholderPage title="Store Settings" />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
