import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Package, User, MapPin, Clock, LogOut, ArrowRight, CheckCircle2 } from 'lucide-react';

const AccountPage = () => {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchMyOrders();
  }, [user, navigate]);

  const fetchMyOrders = async () => {
    try {
      const data = await api.get('/orders/my-orders');
      setOrders(data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif text-neutral-900 mb-2">My Account</h1>
            <p className="text-neutral-500 font-light">Welcome back, {user.firstName}.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 bg-neutral-100 hover:bg-red-50 hover:text-red-600 text-neutral-600 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Profile & Addresses */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-800 text-xl font-serif">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-neutral-500">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Phone</p>
                  <p className="text-sm text-neutral-900">{user.phone || 'Not provided'}</p>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order History */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif text-neutral-900 mb-6 flex items-center gap-3">
              <Package className="text-amber-700" /> Order History
            </h2>
            
            {loading ? (
              <div className="text-center py-12 text-neutral-400 font-serif">Loading your orders...</div>
            ) : orders.length === 0 ? (
              <div className="bg-white p-12 rounded-[2rem] border border-neutral-100 text-center shadow-sm">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300">
                  <Package size={32} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">No orders yet</h3>
                <p className="text-sm text-neutral-500 mb-6">You haven't placed any orders with this account.</p>
                <button onClick={() => navigate('/products')} className="px-8 py-3 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order._id} className="bg-white rounded-[2rem] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                    <div className="p-6 border-b border-neutral-100 bg-[#FDFBF7] flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Order Placed</p>
                        <p className="text-sm font-medium text-neutral-900">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Total</p>
                        <p className="text-sm font-medium text-neutral-900">₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Order #</p>
                        <p className="text-sm font-medium text-neutral-900">{order._id}</p>
                      </div>
                      <div>
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                           order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                           order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                           'bg-amber-100 text-amber-800'
                         }`}>
                           {order.orderStatus === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                           {order.orderStatus}
                         </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map(item => (
                          <div key={item.productId} className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-neutral-50 rounded-xl flex items-center justify-center border border-neutral-100 text-neutral-300 flex-shrink-0">
                              <Package size={24} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-neutral-900">{item.name}</h4>
                              <p className="text-xs text-neutral-500 mt-1">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium text-neutral-900">
                              ₹{item.lineTotal.toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
