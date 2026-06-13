import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';

const RazorpayMock = ({ amount, isOpen, onClose, onSuccess, customerEmail, customerPhone }) => {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setProcessing(false);
      setSuccess(false);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = () => {
    setProcessing(true);
    // Simulate payment delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess({
          razorpay_payment_id: 'pay_mock_' + Math.random().toString(36).substring(7),
          razorpay_order_id: 'order_mock_' + Math.random().toString(36).substring(7),
          razorpay_signature: 'sig_mock_' + Math.random().toString(36).substring(7)
        });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans animate-fadeIn">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-[380px] overflow-hidden flex flex-col relative animate-slideUp">
        
        {/* Header Section */}
        <div className="bg-[#3399cc] text-white p-5 flex flex-col relative">
          <button 
            onClick={!processing && !success ? onClose : undefined} 
            className={`absolute top-4 right-4 text-white/80 hover:text-white transition-colors ${processing || success ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={processing || success}
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white text-[#3399cc] rounded-sm flex items-center justify-center font-bold text-xl border border-white/20 shadow-sm">
              E
            </div>
            <div>
              <h3 className="font-semibold text-base leading-tight">Essaara Wellness</h3>
              <p className="text-white/80 text-xs">Test Mode Integration</p>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-white/80 text-sm mb-1">Amount to pay</p>
            <p className="text-3xl font-semibold">₹{amount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-6 bg-neutral-50 flex-1 min-h-[280px] flex flex-col justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 text-[#3399cc]">
              <Loader2 size={32} className="animate-spin" />
              <p className="text-sm font-medium text-neutral-500">Loading checkout...</p>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center justify-center gap-3 animate-fadeIn">
              <CheckCircle size={56} className="text-green-500" />
              <h3 className="text-lg font-semibold text-neutral-800">Payment Successful</h3>
              <p className="text-sm text-neutral-500">Redirecting to merchant...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-md flex items-start gap-3">
                <ShieldAlert size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Test Environment</p>
                  <p className="text-xs text-blue-700 mt-1">This is a simulated Razorpay mockup. No real payment will be processed.</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-neutral-500 mb-1">Contact Details</p>
                <div className="bg-white border border-neutral-200 rounded-md p-3 text-sm text-neutral-700">
                  <div className="font-medium truncate">{customerPhone || 'Not provided'}</div>
                  <div className="text-neutral-500 text-xs truncate mt-0.5">{customerEmail || 'Not provided'}</div>
                </div>
              </div>

              <button 
                onClick={handlePay}
                disabled={processing}
                className="mt-6 w-full bg-[#3399cc] hover:bg-[#2b86b5] disabled:bg-[#3399cc]/70 text-white font-semibold py-3.5 rounded-md transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {processing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${amount.toLocaleString('en-IN')}`
                )}
              </button>
              
              <div className="flex justify-center items-center gap-1 mt-3">
                <div className="w-3 h-3 bg-neutral-300 rounded-full flex items-center justify-center text-[8px] text-white font-bold">R</div>
                <span className="text-[10px] text-neutral-400 font-medium tracking-wide uppercase">Secured by Razorpay</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RazorpayMock;
