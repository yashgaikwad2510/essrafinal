import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboardPage = () => {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products'
  
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        if (activeTab === 'orders') {
          const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/orders`, config);
          setOrders(res.data);
        } else {
          const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/products`);
          setProducts(res.data);
        }
      } catch (error) {
        console.error('Admin fetch error', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchData();
    }
  }, [activeTab, user, token]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/orders/${orderId}/deliver`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p.id !== productId && p._id !== productId));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Admin...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl text-essaara-earth mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 border-b border-neutral-200 mb-8">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'orders' ? 'border-b-2 border-black text-black' : 'text-neutral-400 hover:text-black'}`}
          >
            Manage Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-4 font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'products' ? 'border-b-2 border-black text-black' : 'text-neutral-400 hover:text-black'}`}
          >
            Manage Products
          </button>
        </div>

        {isFetching ? (
          <div className="text-xs uppercase tracking-widest">Fetching Data...</div>
        ) : (
          <div>
            {activeTab === 'orders' && (
              <div className="overflow-x-auto bg-white border border-neutral-200 rounded-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-widest">
                    <tr>
                      <th className="p-4 font-bold">ID</th>
                      <th className="p-4 font-bold">User</th>
                      <th className="p-4 font-bold">Date</th>
                      <th className="p-4 font-bold">Total</th>
                      <th className="p-4 font-bold">Paid</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-neutral-50">
                        <td className="p-4 text-neutral-500 font-mono">...{order._id.slice(-6)}</td>
                        <td className="p-4 font-bold">{order.user?.name || 'Guest'}</td>
                        <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 font-bold">₹{order.totalPrice}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-sm ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {order.isPaid ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="p-4">
                           <span className="px-2 py-1 rounded-sm bg-blue-100 text-blue-800">{order.orderStatus}</span>
                        </td>
                        <td className="p-4 text-right">
                          <select 
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="bg-transparent border border-neutral-300 p-1 text-[10px] uppercase tracking-widest cursor-pointer outline-hidden"
                          >
                            <option value="placed">Placed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="overflow-x-auto bg-white border border-neutral-200 rounded-sm">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Inventory</span>
                  <button onClick={() => alert('Product creation modal/page coming soon!')} className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-essaara-earth transition-colors">
                    + Add Product
                  </button>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-white border-b border-neutral-200 text-neutral-500 uppercase tracking-widest">
                    <tr>
                      <th className="p-4 font-bold">Product</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold">Price</th>
                      <th className="p-4 font-bold">Stock</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {products.map(product => (
                      <tr key={product.id || product._id} className="hover:bg-neutral-50">
                        <td className="p-4 flex items-center gap-3">
                          <img src={product.productImages?.[0]} alt={product.name} className="w-8 h-8 object-cover rounded-sm border border-neutral-200" />
                          <span className="font-bold">{product.name}</span>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4 font-bold">₹{product.price}</td>
                        <td className="p-4">
                          <span className={product.stock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{product.stock} in stock</span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button onClick={() => alert('Edit feature coming soon!')} className="text-blue-600 hover:text-blue-800 font-bold">Edit</button>
                          <button onClick={() => deleteProduct(product.id || product._id)} className="text-red-600 hover:text-red-800 font-bold">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboardPage;
