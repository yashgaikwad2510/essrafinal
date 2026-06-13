import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../lib/api';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      // Optimistically update the UI
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      ));
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading orders...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif uppercase tracking-widest text-neutral-900">
          Orders Management
        </h2>
        <span className="text-sm text-neutral-500">{orders.length} Total Orders</span>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#FAF9F6] border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-neutral-500">Order ID</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-neutral-500">Customer</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-neutral-500">Date</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-neutral-500">Items</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-neutral-500">Total</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-neutral-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-[#FCFBF9] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900">{order._id.substring(order._id.length - 6).toUpperCase()}</div>
                    <div className="text-xs text-neutral-400 mt-1">{order.paymentMethod.toUpperCase()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900">{order.customer.firstName} {order.customer.lastName}</div>
                    <div className="text-xs text-neutral-500 mt-1">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2 overflow-hidden mb-1">
                      {order.items.slice(0, 3).map((item, idx) => {
                        const imgUrl = item.product?.images?.[0];
                        return (
                          <img 
                            key={idx} 
                            src={imgUrl ? (imgUrl.startsWith('http') ? imgUrl : `http://localhost:5000${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`) : 'https://via.placeholder.com/40'} 
                            alt={item.name} 
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover bg-neutral-100"
                          />
                        );
                      })}
                      {order.items.length > 3 && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-neutral-100 text-[10px] font-bold text-neutral-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    Rs {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full border outline-none cursor-pointer ${
                        order.orderStatus === 'placed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        order.orderStatus === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        order.orderStatus === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                        order.orderStatus === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-neutral-50 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
