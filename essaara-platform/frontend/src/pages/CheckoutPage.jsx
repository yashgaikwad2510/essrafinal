import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../lib/api';
import RazorpayMock from '../components/common/RazorpayMock';

const CheckoutPage = () => {
  const { cart, getSubtotal, setIsCartOpen, clearCart } = useCart();
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showRazorpay, setShowRazorpay] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'online'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0 || isSubmitting) return;

    if (formData.paymentMethod === 'online') {
      setShowRazorpay(true);
      return;
    }

    await processOrder('cod');
  };

  const processOrder = async (method, paymentDetails = null) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await createOrder({
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: method,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      });

      alert(`Order placed successfully. Total: Rs ${result.order.total.toLocaleString('en-IN')}.`);
      clearCart();
      window.location.href = '/';
    } catch (error) {
      setSubmitError(error.message || 'Unable to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowRazorpay(false);
    }
  };

  const subtotal = getSubtotal();
  const shippingCost = subtotal > 1500 ? 0 : 150;
  const totalCost = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 text-essaara-earth">
        <div className="w-16 h-16 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-300 mb-4">
          Bag
        </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 bg-white border border-neutral-200/60 p-6 md:p-8 rounded-xs shadow-3xs text-left">
          <h2 className="font-serif text-xl uppercase tracking-widest border-b border-neutral-100 pb-3 mb-6">
            Shipping Information
          </h2>

          {submitError && (
            <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            <Field label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            <Field label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <Field label="Delivery Street Address" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Field label="City" name="city" value={formData.city} onChange={handleInputChange} required />
            <Field label="Postal Pin Code" name="postalCode" inputMode="numeric" pattern="[1-9][0-9]{5}" value={formData.postalCode} onChange={handleInputChange} required />
          </div>

          <h2 className="font-serif text-xl uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">
            Payment Preferences
          </h2>

          <div className="flex flex-col gap-3 mb-8">
            <label className={`flex items-center gap-3 bg-[#FAF9F6] border ${formData.paymentMethod === 'online' ? 'border-black' : 'border-neutral-200'} p-4 rounded-xs cursor-pointer select-none transition-colors`}>
              <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleInputChange} className="accent-black w-4 h-4 cursor-pointer" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider">Instant Online Gateway Payment</span>
                <span className="text-[10px] text-neutral-400">Pay securely via Razorpay Mock</span>
              </div>
            </label>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-black hover:bg-essaara-earth text-white border border-black hover:border-essaara-earth font-sans text-xs font-bold uppercase tracking-widest py-4 transition-all duration-300 rounded-xs cursor-pointer shadow-xs text-center disabled:opacity-60 disabled:cursor-not-allowed">
            {isSubmitting ? 'Placing Order...' : 'Place Order Safely'}
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
                      <p className="text-[10px] text-neutral-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 flex-shrink-0 pl-2">
                    Rs {(item.price * item.quantity).toLocaleString('en-IN')}.00
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-100 pt-4 flex flex-col gap-2.5 font-sans text-xs">
              <SummaryRow label="Bag Subtotal" value={`Rs ${subtotal.toLocaleString('en-IN')}.00`} />
              <SummaryRow label="Shipping Handling" value={shippingCost === 0 ? 'FREE' : `Rs ${shippingCost}.00`} />
              <div className="w-full h-[1px] bg-neutral-100 my-1" />
              <div className="flex justify-between text-neutral-800 font-bold text-sm">
                <span className="uppercase tracking-widest text-[11px]">Estimated Grand Total</span>
                <span className="text-base text-neutral-900">Rs {totalCost.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <RazorpayMock 
        isOpen={showRazorpay} 
        onClose={() => setShowRazorpay(false)} 
        amount={totalCost} 
        customerEmail={formData.email}
        customerPhone={formData.phone}
        onSuccess={(details) => processOrder('online', details)}
      />
    </main>
  );
};

const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">{label}</label>
    <input {...props} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-hidden focus:border-black" />
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-neutral-500">
    <span className="uppercase tracking-widest text-[10px]">{label}</span>
    <span>{value}</span>
  </div>
);

export default CheckoutPage;
