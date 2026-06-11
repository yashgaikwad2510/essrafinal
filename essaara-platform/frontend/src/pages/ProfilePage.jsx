import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { user, token, loading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setFetchingOrders(false);
      }
    };

    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-sans text-xs tracking-widest uppercase">Loading Profile...</div>;
  }

  if (!user) return null;

  // Extract initials
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toLowerCase();
    }
    return name[0].toLowerCase();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    await updateProfile({ name: editName, phone: editPhone });
    setIsUpdating(false);
    setIsEditing(false);
  };

  return (
    <main className="w-full bg-[#FDFBF7] min-h-[85vh] py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-serif text-4xl text-neutral-900 mb-1">My Account</h1>
            <p className="font-sans text-sm font-light text-neutral-400">Welcome back, {user.name.split(' ')[0]}.</p>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-neutral-600 bg-neutral-100 hover:bg-neutral-200 px-6 py-3 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Column: Profile Card */}
          <aside className="w-full lg:w-1/3 bg-white rounded-3xl p-8 shadow-xs border border-neutral-100 relative">
            {isEditing ? (
              <form onSubmit={handleUpdate} className="flex flex-col gap-4 animate-fadeIn">
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-100 pb-2">Edit Profile</h3>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-neutral-200 p-3 rounded-xl text-sm outline-hidden focus:border-amber-900/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-neutral-200 p-3 rounded-xl text-sm outline-hidden focus:border-amber-900/30"
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <button type="submit" disabled={isUpdating} className="bg-essaara-earth text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-essaara-gold">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-neutral-100 text-neutral-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-neutral-200">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-8 animate-fadeIn">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-900 flex items-center justify-center font-serif text-2xl lowercase">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-neutral-900">{user.name}</h2>
                    <p className="font-sans text-xs font-light text-neutral-400 mt-0.5">{user.email}</p>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Phone</p>
                  <p className="font-sans text-sm text-neutral-700">{user.phone || 'Not provided'}</p>
                </div>

                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-left font-sans text-xs font-bold uppercase tracking-widest text-essaara-earth hover:text-essaara-gold transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </aside>

          {/* Right Column: Order History */}
          <section className="w-full lg:w-2/3">
            <h2 className="font-serif text-2xl text-neutral-900 mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-essaara-earth">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              Order History
            </h2>

            {fetchingOrders ? (
              <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xs flex justify-center text-xs tracking-widest uppercase text-neutral-400">Loading Orders...</div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-neutral-100 shadow-xs text-center">
                <p className="text-neutral-500 font-light mb-4">No orders placed yet.</p>
                <button onClick={() => navigate('/shop')} className="font-sans text-xs font-bold uppercase tracking-widest bg-essaara-earth text-white px-6 py-3 rounded-full hover:bg-essaara-gold transition-colors">Start Shopping</button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-3xl border border-neutral-100 shadow-xs overflow-hidden transition-all hover:shadow-md">
                    
                    {/* Order Header Grid */}
                    <div className="bg-[#FAF9F6] p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Order Placed</p>
                        <p className="font-sans text-sm text-neutral-800">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Total</p>
                        <p className="font-sans text-sm text-neutral-800 font-medium">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Order #</p>
                        <p className="font-mono text-xs text-neutral-600 truncate">{order._id}</p>
                      </div>
                      <div className="col-span-2 md:col-span-1 md:text-right flex items-center md:justify-end gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          order.orderStatus === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                          order.orderStatus === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="p-6 flex flex-col gap-4">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-center p-1.5 overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div>
                              <h4 className="font-serif text-lg text-neutral-900">{item.name}</h4>
                              <p className="font-sans text-[11px] text-neutral-400 mt-0.5">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="font-sans text-sm font-medium text-neutral-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
