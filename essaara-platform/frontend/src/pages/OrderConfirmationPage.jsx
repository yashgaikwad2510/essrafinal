import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parse order ID from URL search params (e.g. ?id=12345)
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('id');

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate, token]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase">Loading Order Details...</div>;
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-serif text-2xl mb-4">Order Not Found</h2>
        <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border border-black bg-black text-white px-8 py-3 hover:bg-transparent hover:text-black">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-16 px-6 flex justify-center">
      <div className="max-w-2xl w-full bg-white p-8 md:p-12 border border-neutral-200/60 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        
        <h1 className="font-serif text-3xl text-essaara-earth mb-2">Order Confirmed!</h1>
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-8">Thank you for your sacred purchase.</p>
        
        <div className="text-left bg-[#FAF9F6] p-6 border border-neutral-200 rounded-sm mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Order Reference</p>
          <p className="text-sm font-bold text-neutral-800 mb-4">#{order._id}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Date</p>
              <p className="text-xs text-neutral-800">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Total Paid</p>
              <p className="text-xs text-neutral-800">₹{order.totalPrice.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Payment Method</p>
              <p className="text-xs text-neutral-800">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Status</p>
              <p className="text-xs text-neutral-800">{order.orderStatus}</p>
            </div>
          </div>
        </div>

        <Link to="/orders" className="block w-full text-center bg-essaara-earth text-white font-sans text-xs font-bold uppercase tracking-widest py-4 hover:bg-essaara-gold transition-colors">
          View Order History
        </Link>
      </div>
    </main>
  );
};

export default OrderConfirmationPage;
