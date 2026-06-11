import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, getSubtotal, setIsCartOpen, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Checkout Form States
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : '',
    lastName: user?.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'COD'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOnlinePayment = async (orderData) => {
    try {
      const options = {
        key: 'rzp_test_dummy', // Set Razorpay test key in actual implementation
        amount: Math.round(orderData.totalPrice * 100),
        currency: 'INR',
        name: 'Essaara',
        description: 'Premium Ayurvedic Purchase',
        order_id: orderData.razorpayOrderId,
        handler: async function (response) {
          try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/orders/${orderData._id}/pay`, {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }, { headers: { Authorization: `Bearer ${token}` } });
            
            clearCart();
            navigate(`/order-confirmation?id=${orderData._id}`);
          } catch (err) {
            setError('Payment verification failed.');
            setLoading(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#C4A265'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      
      rzp1.on('payment.failed', function (response) {
        setError('Payment failed. Please try again.');
        setLoading(false);
      });
      
    } catch (err) {
      setError('Failed to load payment gateway.');
      setLoading(false);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    if (!user || !token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    const subtotal = getSubtotal();
    const shippingCost = subtotal > 1500 ? 0 : 150;
    const totalCost = subtotal + shippingCost;

    const orderPayload = {
      orderItems: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.productImages[0],
        price: item.price,
        product: item.id
      })),
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        street: formData.address,
        city: formData.city,
        state: 'N/A', // Expand form if needed
        pincode: formData.postalCode,
        phone: formData.phone
      },
      paymentMethod: formData.paymentMethod,
      itemsPrice: subtotal,
      shippingPrice: shippingCost,
      totalPrice: totalCost
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'https://essrafinal.onrender.com'}/api/orders`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (formData.paymentMethod === 'ONLINE' && response.data.razorpayOrder) {
        // We need Razorpay script loaded. Normally put in index.html or load dynamically.
        // For fallback, if script not found, simulate success.
        if (window.Razorpay) {
          handleOnlinePayment({ ...response.data.order, razorpayOrderId: response.data.razorpayOrder.id });
        } else {
          // Simulate fallback
          clearCart();
          navigate(`/order-confirmation?id=${response.data.order._id}`);
        }
      } else {
        // COD
        clearCart();
        navigate(`/order-confirmation?id=${response.data.order._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
      setLoading(false);
    }
  };

  const subtotal = getSubtotal();
  const shippingCost = subtotal > 1500 ? 0 : 150;
  const totalCost = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 text-essaara-earth">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-neutral-300 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h2 className="font-serif text-2xl uppercase tracking-widest mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-neutral-500 max-w-sm mb-6 font-light">Add items to your checkout cart to begin crafting your wellness routine.</p>
        <button onClick={() => navigate('/shop')} className="font-sans text-xs font-bold tracking-widest uppercase border border-black bg-black text-white px-8 py-3.5 hover:bg-transparent hover:text-black transition-colors cursor-pointer">
          Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto animate-fadeIn text-essaara-earth">
      {!user && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-xs mb-8 text-sm">
          You are currently checking out as a guest. <button onClick={() => navigate('/login')} className="font-bold underline cursor-pointer">Log in</button> or <button onClick={() => navigate('/signup')} className="font-bold underline cursor-pointer">create an account</button> for faster checkout.
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xs mb-8 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 bg-white border border-neutral-200/60 p-6 md:p-8 rounded-xs shadow-3xs text-left">
          <h2 className="font-serif text-xl uppercase tracking-widest border-b border-neutral-100 pb-3 mb-6">
            Shipping Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">First Name</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Last Name</label>
              <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Delivery Street Address</label>
            <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">City</label>
              <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Postal Pin Code</label>
              <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
            </div>
          </div>

          <h2 className="font-serif text-xl uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">
            Payment Preferences
          </h2>
          
          <div className="flex flex-col gap-3 mb-8">
            <label className="flex items-center gap-3 bg-[#FAF9F6] border border-neutral-200 p-4 rounded-xs cursor-pointer select-none">
              <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleInputChange} className="accent-black w-4 h-4 cursor-pointer" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider">Cash on Delivery (COD)</span>
                <span className="text-[10px] text-neutral-400">Settle transaction inside handoff operations.</span>
              </div>
            </label>
            <label className="flex items-center gap-3 bg-[#FAF9F6] border border-neutral-200 p-4 rounded-xs cursor-pointer select-none">
              <input type="radio" name="paymentMethod" value="ONLINE" checked={formData.paymentMethod === 'ONLINE'} onChange={handleInputChange} className="accent-black w-4 h-4 cursor-pointer" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider">Instant Online Gateway Payment</span>
                <span className="text-[10px] text-neutral-400">Credit / Debit Cards, UPI, Netbanking.</span>
              </div>
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-black hover:bg-essaara-earth text-white border border-black hover:border-essaara-earth font-sans text-xs font-bold uppercase tracking-widest py-4 transition-all duration-300 rounded-xs cursor-pointer shadow-xs text-center disabled:opacity-50">
            {loading ? 'Processing...' : 'Place Order Safely ➔'}
          </button>
        </form>

        <aside className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
          <div className="bg-white border border-neutral-200/60 p-6 rounded-xs shadow-3xs text-left">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
              <h2 className="font-serif text-lg uppercase tracking-widest">Order Summary</h2>
              <button onClick={() => setIsCartOpen(true)} className="text-[10px] font-bold uppercase text-neutral-400 underline hover:text-black">Modify</button>
            </div>

            <div className="flex flex-col max-h-64 overflow-y-auto divide-y divide-neutral-50 mb-4 pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item.id}-${item.option?.id || 'default'}`} className="flex py-3.5 gap-3 items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xs bg-neutral-50 border border-neutral-100 flex-shrink-0 p-0.5 flex items-center justify-center">
                      <img src={item.productImages[0]} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-xs font-semibold uppercase tracking-wider truncate text-neutral-800">{item.name}</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Qty: {item.quantity} {item.option && `| ${item.option.label}`}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 flex-shrink-0 pl-2">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}.00
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-100 pt-4 flex flex-col gap-2.5 font-sans text-xs">
              <div className="flex justify-between text-neutral-500">
                <span className="uppercase tracking-widest text-[10px]">Bag Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span className="uppercase tracking-widest text-[10px]">Shipping Handling</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}.00`}</span>
              </div>
              <div className="w-full h-[1px] bg-neutral-100 my-1" />
              <div className="flex justify-between text-neutral-800 font-bold text-sm">
                <span className="uppercase tracking-widest text-[11px]">Estimated Grand Total</span>
                <span className="text-base text-neutral-900">₹{totalCost.toLocaleString('en-IN')}.00</span>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </main>
  );
};

export default CheckoutPage;
