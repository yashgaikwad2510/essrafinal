import React, { useState, useEffect } from 'react';
import { getOrders } from '../lib/api';
import { Search, MapPin, Truck, Plus, ArrowDownUp, Package, Navigation, CreditCard, User, Info, CheckCircle2 } from 'lucide-react';

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/images/')) return `http://localhost:5174${url}`; 
  if (url.startsWith('uploads/') || url.startsWith('/uploads/')) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `http://localhost:5000${cleanUrl}`; 
  }
  return url;
};

// Map Visualization Component
const MapVisualization = ({ selectedOrder }) => {
  return (
    <div className="relative w-full h-[350px] bg-[#eef2f5] rounded-[2rem] overflow-hidden border border-white shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] flex items-center justify-center">
       {/* SVG background grid / paths */}
       <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
         <defs>
           <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
           </pattern>
         </defs>
         <rect width="100%" height="100%" fill="url(#grid)" />
         <path d="M0,100 C150,150 250,50 400,200 S600,300 800,150" fill="none" stroke="#cbd5e1" strokeWidth="2" />
         <path d="M0,250 C150,200 250,300 400,200 S550,150 800,250" fill="none" stroke="#cbd5e1" strokeWidth="2" />
       </svg>

       {selectedOrder ? (
         <div className="relative w-full h-full">
            <style>
              {`
                @keyframes mapDash {
                  to { stroke-dashoffset: -100; }
                }
              `}
            </style>
            {/* The Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
               <path d="M 30% 20% C 40% 30% 45% 40% 50% 50% S 60% 60% 70% 70%" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6 6" style={{ animation: 'mapDash 2s linear infinite' }} />
            </svg>

            {/* Origin Pin */}
            <div className="absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
               <div className="bg-white px-3 py-1.5 rounded-xl shadow-md text-[10px] font-bold text-neutral-800 mb-2 whitespace-nowrap border border-neutral-100">Essaara Hub</div>
               <div className="w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-[1.5px] border-white">
                 <Package size={10} />
               </div>
            </div>

            {/* Current Location Pin (Truck) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
               <div className={`px-3 py-1.5 rounded-xl shadow-lg text-[10px] font-bold text-white mb-2 whitespace-nowrap ${selectedOrder.status === 'Delivered' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                 {selectedOrder.status === 'Delivered' ? 'Delivered' : selectedOrder.status === 'Shipped' ? 'In Transit' : 'Pending'}
               </div>
               <div className="relative">
                 {selectedOrder.status !== 'Delivered' && (
                   <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50"></div>
                 )}
                 <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white ${selectedOrder.status === 'Delivered' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                   {selectedOrder.status === 'Delivered' ? <CheckCircle2 size={14} /> : <Truck size={14} />}
                 </div>
               </div>
            </div>

            {/* Destination Pin */}
            <div className="absolute top-[70%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
               <div className="bg-white px-3 py-1.5 rounded-xl shadow-md text-[10px] font-bold text-neutral-800 mb-2 whitespace-nowrap border border-neutral-100">
                 {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state || selectedOrder.shippingAddress.country}
               </div>
               <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-md z-10 border-2 border-white"></div>
            </div>
         </div>
       ) : (
         <div className="text-neutral-400 font-serif flex items-center gap-2">
           <MapPin size={18} /> Select a shipment to view tracking
         </div>
       )}
    </div>
  )
}

const AdminShipmentsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [infoTab, setInfoTab] = useState('Order Details');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      // Reverse to show newest first
      const fetchedOrders = (data.orders || []).reverse();
      setOrders(fetchedOrders);
      if (fetchedOrders.length > 0) {
        setSelectedOrderId(fetchedOrders[0]._id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Map backend status to our Shipments tabs
  // Backend: Placed, Confirmed -> Pending
  // Backend: Shipped -> In Transit
  // Backend: Delivered -> Completed
  const getTabForStatus = (status) => {
    if (status === 'Shipped') return 'In Transit';
    if (status === 'Delivered') return 'Completed';
    return 'Pending';
  };

  const filteredOrders = orders.filter(o => o.status !== 'Cancelled' && getTabForStatus(o.status) === activeTab);
  const selectedOrder = orders.find(o => o._id === selectedOrderId);

  if (loading) {
    return <div className="p-8 text-center text-neutral-500 font-serif">Loading tracking data...</div>;
  }

  return (
    <div className="h-full flex gap-6 max-w-[1400px] mx-auto animate-fadeIn relative -mt-4">
      {/* Left Column: List */}
      <div className="w-[400px] flex flex-col flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-serif text-neutral-900">Shipments</h1>
        </div>

        {/* Status Tabs */}
        <div className="flex bg-white/60 p-1.5 rounded-full border border-neutral-200/60 mb-6 shadow-sm backdrop-blur-md">
          {['Pending', 'In Transit', 'Completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-white text-neutral-900 shadow-sm border border-neutral-100' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order Cards List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-10" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm border border-dashed border-neutral-200 rounded-[2rem]">No shipments in this status</div>
          ) : (
            filteredOrders.map(order => {
              const isSelected = order._id === selectedOrderId;
              const firstItem = order.items && order.items[0];
              const displayImage = firstItem?.product?.images?.[0] || null;

              return (
                <div 
                  key={order._id}
                  onClick={() => setSelectedOrderId(order._id)}
                  className={`p-4 rounded-[1.5rem] cursor-pointer transition-all duration-300 border ${
                    isSelected 
                      ? 'bg-blue-50/50 border-blue-500/30 shadow-[0_4px_20px_rgba(59,130,246,0.1)]' 
                      : 'bg-white border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200/50">
                      {displayImage ? (
                        <img src={getImageUrl(displayImage)} alt="product" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package size={20} className="text-neutral-300"/></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-neutral-900 truncate">
                        {firstItem?.product?.name || `Order #${order._id.slice(-6)}`}
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest mt-1">#{order._id}</p>
                      <p className="text-xs text-neutral-500 truncate mt-1">
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                      </p>
                      <p className="text-sm font-bold text-neutral-900 mt-1">₹{order.total.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Map & Details */}
      <div className="flex-1 flex flex-col gap-6" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        
        {/* Map Header */}
        <div className="flex justify-between items-center bg-white/70 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-white shadow-sm">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
               <Navigation size={14} />
             </div>
             <input type="text" placeholder="Search order, tracking ID..." className="bg-transparent border-none focus:ring-0 text-sm w-64 font-medium placeholder-neutral-400" />
           </div>
           <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-600 border border-neutral-200 hover:bg-neutral-100">
               <ArrowDownUp size={12} /> Sort
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-600 border border-neutral-200 hover:bg-neutral-100">
               <Plus size={12} /> Filter
             </button>
           </div>
        </div>

        {/* Map Visualization */}
        <MapVisualization selectedOrder={selectedOrder} />

        {/* Information Panel */}
        <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col overflow-hidden">
           
           {/* Info Tabs */}
           <div className="flex gap-6 border-b border-neutral-100 mb-6 pb-2">
             {['Order Details', 'Driver Information', 'Vehicle', 'Billing', 'Customer ID'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setInfoTab(tab)}
                 className={`text-xs font-bold uppercase tracking-widest pb-2 relative transition-colors ${
                   infoTab === tab ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
                 }`}
               >
                 {tab}
                 {infoTab === tab && (
                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
                 )}
               </button>
             ))}
           </div>

           {/* Info Content */}
           <div className="flex-1 overflow-y-auto">
             {!selectedOrder ? (
               <div className="text-center text-neutral-400 text-sm mt-10">No order selected</div>
             ) : (
               <div className="animate-fadeIn">
                 {infoTab === 'Order Details' && (
                   <div className="grid grid-cols-4 gap-6">
                     <div>
                       <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Order ID</p>
                       <p className="text-sm font-medium text-neutral-900">#{selectedOrder._id}</p>
                     </div>
                     <div>
                       <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Product</p>
                       <p className="text-sm font-medium text-neutral-900 truncate">
                         {selectedOrder.items?.[0]?.product?.name || 'Multiple Items'}
                       </p>
                     </div>
                     <div>
                       <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Total Price</p>
                       <p className="text-sm font-medium text-neutral-900">₹{selectedOrder.total.toLocaleString('en-IN')}</p>
                     </div>
                     <div>
                       <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Destination Address</p>
                       <p className="text-sm font-medium text-neutral-900">{selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}</p>
                     </div>
                   </div>
                 )}

                 {infoTab === 'Driver Information' && (
                   <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-full bg-neutral-100 overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=John+Doe&background=e2e8f0&color=475569" alt="Driver" className="w-full h-full object-cover"/>
                     </div>
                     <div>
                       <p className="text-sm font-bold text-neutral-900">Logistics Partner</p>
                       <p className="text-xs text-neutral-500 mt-1">Pending allocation by courier</p>
                     </div>
                   </div>
                 )}

                 {(infoTab === 'Vehicle' || infoTab === 'Billing' || infoTab === 'Customer ID') && (
                   <div className="flex items-center gap-3 text-neutral-400">
                     <Info size={16} />
                     <p className="text-sm">Information synced from external provider.</p>
                   </div>
                 )}
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminShipmentsPage;
