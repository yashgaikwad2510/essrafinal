import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderHistoryPage = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase">Loading Orders...</div>;
  }

  return (
    <main className="w-full bg-[#FDFBF7] min-h-[80vh] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl text-essaara-earth mb-8 border-b border-neutral-200 pb-4">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white border border-neutral-200/60 rounded-sm">
            <p className="text-neutral-500 text-sm mb-4">You haven't placed any orders yet.</p>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-essaara-earth underline hover:text-essaara-gold">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-neutral-200/60 p-6 rounded-sm shadow-sm flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Order #{order._id}</p>
                  <p className="text-xs text-neutral-500 mb-4">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  
                  <div className="flex flex-col gap-3">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-800">{item.name}</p>
                          <p className="text-[10px] text-neutral-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between md:items-end min-w-[200px] border-t md:border-t-0 md:border-l border-neutral-100 pt-4 md:pt-0 md:pl-6">
                  <div className="mb-4 md:mb-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Total</p>
                    <p className="text-lg font-bold text-neutral-900">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} mb-2`}>
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                    <span className="ml-2 inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-blue-100 text-blue-800">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderHistoryPage;
