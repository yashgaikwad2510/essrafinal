import React, { useEffect, useState } from 'react';
import { fetchProducts, getOrders } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Package, IndianRupee, Clock, ArrowUpRight, Plus, ChevronDown, Calendar, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Realistic mock data for the dynamic area chart
const chartData = [
  { name: 'Mon', revenue: 12000 },
  { name: 'Tue', revenue: 18000 },
  { name: 'Wed', revenue: 15000 },
  { name: 'Thu', revenue: 22000 },
  { name: 'Fri', revenue: 28000 },
  { name: 'Sat', revenue: 35000 },
  { name: 'Sun', revenue: 42000 },
];

const AdminDashboardOverview = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeProducts: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData] = await Promise.all([
        fetchProducts(),
        getOrders()
      ]);

      const products = Array.isArray(productsData) ? productsData : (productsData.products || []);
      const orders = Array.isArray(ordersData) ? ordersData : (ordersData.orders || []);

      // Calculate Stats
      const revenue = orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((sum, order) => sum + order.total, 0);

      const pending = orders.filter(o => o.status === 'Placed').length;

      setStats({
        totalRevenue: revenue,
        totalOrders: orders.length,
        activeProducts: products.length,
        pendingOrders: pending
      });

      // Get 6 most recent orders
      setRecentOrders(orders.slice(0, 6));
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <div className="w-12 h-12 border-4 border-amber-900/20 border-t-amber-900 rounded-full animate-spin"></div>
        <div className="text-neutral-400 font-serif tracking-widest uppercase text-sm">Synchronizing Command Center...</div>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, 
      icon: IndianRupee, 
      trend: '+12.5%',
      color: 'text-emerald-700', 
      bg: 'bg-emerald-50',
      pillBg: 'bg-emerald-500',
      pillColor: 'text-white'
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      icon: ShoppingBag, 
      trend: '+8.2%',
      color: 'text-emerald-700', 
      bg: 'bg-emerald-50',
      pillBg: 'bg-emerald-500',
      pillColor: 'text-white'
    },
    { 
      label: 'Pending Dispatches', 
      value: stats.pendingOrders, 
      icon: Clock, 
      trend: '-1.2%',
      color: 'text-amber-700', 
      bg: 'bg-amber-50',
      pillBg: 'bg-amber-400',
      pillColor: 'text-amber-900'
    },
    { 
      label: 'Live Products', 
      value: stats.activeProducts, 
      icon: Package, 
      trend: '-3.7%',
      color: 'text-amber-700', 
      bg: 'bg-amber-50',
      pillBg: 'bg-amber-400',
      pillColor: 'text-amber-900'
    }
  ];

  return (
    <div className="w-full flex-1 relative bg-[#F4F7F5] animate-fadeIn pb-10">
      
      {/* Deep Green Header Background */}
      <div className="absolute top-0 left-0 w-full h-[280px] bg-[#0f4c3a] rounded-b-[2rem] z-0 shadow-inner"></div>

      <div className="relative z-10 px-8 pt-10 max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-neutral-300 font-medium">Good Morning,</div>
            <h1 className="text-3xl font-bold text-white tracking-wide">{admin?.name || 'Administrator'}</h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0f4c3a] text-white border border-emerald-700/50 rounded-full hover:bg-emerald-800/50 transition-colors text-sm font-medium">
              <Calendar size={16} /> {new Date().getFullYear()} <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#0f4c3a] rounded-full text-sm font-bold hover:bg-neutral-100 transition-colors shadow-lg">
              Export Data
            </button>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="flex gap-6 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex-1 min-w-[240px] bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative transition-transform hover:-translate-y-1 duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <button className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors">
                    <ArrowUpRight size={12} />
                  </button>
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-neutral-900">{stat.value}</h3>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold mb-1.5 ${stat.pillBg} ${stat.pillColor}`}>
                    {stat.trend}
                  </div>
                </div>
                <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
              </div>
            );
          })}
          
          {/* Add New Widget Card */}
          <div className="min-w-[180px] bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center border border-white hover:border-emerald-500/30 cursor-pointer group transition-all">
            <div className="w-12 h-12 rounded-full bg-[#0f4c3a] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
              <Plus size={20} />
            </div>
            <p className="text-sm font-medium text-neutral-600">Add new widget</p>
          </div>
        </div>

        {/* Bottom Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-1 bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-neutral-900">Recent Orders</h3>
               <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors">
                 <ArrowUpRight size={14} />
               </button>
             </div>
             <div className="flex items-center gap-2 mb-6">
               <span className="text-3xl font-bold text-neutral-900">{recentOrders.length}</span>
               <span className="text-sm text-neutral-500 font-medium">Orders</span>
             </div>
             
             <div className="space-y-4">
               {recentOrders.map((order, idx) => (
                 <div key={idx} className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-500 font-bold text-sm">
                     {order.customer.firstName.charAt(0)}{order.customer.lastName.charAt(0)}
                   </div>
                   <div className="flex-1">
                     <h4 className="text-sm font-bold text-neutral-900">{order.customer.firstName} {order.customer.lastName}</h4>
                     <p className="text-xs text-emerald-600 font-medium">{order.status}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-1 rounded-md font-medium mb-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                   </div>
                 </div>
               ))}
               {recentOrders.length === 0 && (
                 <div className="text-center text-sm text-neutral-400 py-6">No recent orders found.</div>
               )}
             </div>
           </div>

           <div className="lg:col-span-2 flex flex-col gap-6">
             <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-neutral-900">Revenue Velocity</h3>
                 <button className="text-neutral-400 hover:text-neutral-600"><MoreHorizontal size={20} /></button>
               </div>
               <div className="w-full h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0f4c3a" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0f4c3a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a3a3a3' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a3a3a3' }} tickFormatter={(value) => `₹${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#0f4c3a', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#0f4c3a" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-neutral-600">Average Order Value</h3>
                    <button className="text-neutral-400 hover:text-neutral-600"><MoreHorizontal size={16} /></button>
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 mb-1">₹{stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(0) : 0}</p>
                  <p className="text-xs text-emerald-600 font-bold">+12% vs last month</p>
                </div>
                
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-neutral-600">Customer Retention</h3>
                    <button className="text-neutral-400 hover:text-neutral-600"><MoreHorizontal size={16} /></button>
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 mb-1">89.06%</p>
                  <p className="text-xs text-emerald-600 font-bold">+2.4% vs last month</p>
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardOverview;
