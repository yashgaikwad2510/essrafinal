import React, { useState } from 'react';

const ContactPage = () => {
  const [inquiryData, setInquiryData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    estimatedQuantity: '50-100',
    inquiryType: 'corporate-gifting',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting B2B Bulk Inquiry Package:", inquiryData);
    // Hook backend corporate mailer service or MongoDB CRM schema handler here
    setFormSubmitted(true);
  };

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto animate-fadeIn text-essaara-earth">
      
      {/* HEADER SECTION AREA */}
      <div className="text-center mb-14">
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light mb-2">
          Connect With Us
        </h1>
        <p className="font-sans text-xs md:text-sm text-neutral-500 font-light tracking-wide uppercase">
          Purely Ayurvedic | Customer Care & Tailored Bulk Customizations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* =========================================================================
            LEFT COLUMN: BRAND CHANNELS & CUSTOMER CARE (Spans 5 Columns)
            ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col text-left gap-8">
          
          <div className="bg-white border border-neutral-200/60 p-6 md:p-8 rounded-xs shadow-3xs">
            <h3 className="font-serif text-lg uppercase tracking-widest border-b border-neutral-100 pb-2 mb-4">
              Customer Support
            </h3>
            <div className="flex flex-col gap-4 font-sans text-xs leading-relaxed tracking-wide text-neutral-600">
              <p>
                <span className="font-bold uppercase tracking-wider text-neutral-800 block mb-0.5">Direct Hotline:</span>
                <a href="tel:9109101059" className="hover:text-amber-800 transition-colors text-sm font-medium text-black">
                  +91 91091 01059
                </a>
              </p>
              <div className="w-full h-[1px] bg-neutral-100" />
              <p>
                <span className="font-bold uppercase tracking-wider text-neutral-800 block mb-0.5">Support Desk Response Windows:</span>
                Monday through Saturday: 10:00 AM — 6:30 PM (IST)
              </p>
            </div>
          </div>

          <div className="bg-white border border-neutral-200/60 p-6 md:p-8 rounded-xs shadow-3xs">
            <h3 className="font-serif text-lg uppercase tracking-widest border-b border-neutral-100 pb-2 mb-4">
              Our Laboratories
            </h3>
            <div className="flex flex-col gap-3 font-sans text-xs leading-relaxed tracking-wide text-neutral-600">
              <p>
                <span className="font-bold uppercase tracking-wider text-neutral-800 block mb-0.5">Manufactured Wholesomely By:</span>
                Shri Hari Vithal Herbals <br />
                (Ugale Hospital, Sangola Road, Pandharpur - 413304)
              </p>
              <div className="w-full h-[1px] bg-neutral-100 my-1" />
              <p>
                <span className="font-bold uppercase tracking-wider text-neutral-800 block mb-0.5">Marketed Exclusively By:</span>
                Essaara Branding Networks Private Limited
              </p>
            </div>
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN: B2B CORPORATE & BULK INQUIRY CONSOLE (Spans 7 Columns)
            ========================================================================= */}
        <div className="lg:col-span-7 bg-white border border-neutral-200/60 p-6 md:p-8 rounded-xs shadow-3xs text-left">
          <h2 className="font-serif text-xl uppercase tracking-widest border-b border-neutral-100 pb-3 mb-2">
            Bulk & Custom Orders
          </h2>
          <p className="font-sans text-xs text-neutral-400 font-light mb-6 uppercase tracking-wide">
            Plan custom client corporate hampers, weddings, or custom seasonal bundles.
          </p>

          {formSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-xs text-center my-6 animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-emerald-700 mx-auto mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="font-serif text-lg uppercase tracking-wider text-emerald-900 mb-2">Inquiry Logged</h3>
              <p className="font-sans text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed font-light">
                Thank you for connecting with Essaara. Our specialized corporate hospitality coordinator will review your quantities and reach out within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Contact Person Name</label>
                  <input type="text" name="fullName" required value={inquiryData.fullName} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-none focus:border-black" placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Company Name / Event</label>
                  <input type="text" name="companyName" value={inquiryData.companyName} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-none focus:border-black" placeholder="Optional" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Business Email</label>
                  <input type="email" name="email" required value={inquiryData.email} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-none focus:border-black" placeholder="corporate@domain.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Mobile / WhatsApp Number</label>
                  <input type="tel" name="phone" required value={inquiryData.phone} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-none focus:border-black" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Estimated Batches / Volume</label>
                  <select name="estimatedQuantity" value={inquiryData.estimatedQuantity} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-none focus:border-black cursor-pointer">
                    <option value="20-50">20 — 50 Custom Units</option>
                    <option value="50-100">50 — 100 Custom Units</option>
                    <option value="100-500">100 — 500 Custom Units</option>
                    <option value="500+">500+ Institutional Bulk Order</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Inquiry Target Classification</label>
                  <select name="inquiryType" value={inquiryData.inquiryType} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-none focus:border-black cursor-pointer">
                    <option value="corporate-gifting">Corporate Executive Gifting</option>
                    <option value="festival-bundles">Seasonal Festival Collections</option>
                    <option value="wedding-favors">Premium Wedding / Event Favors</option>
                    <option value="custom-hampers">Custom Curated Gift Hampers</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-neutral-500">Customization Requirements Details</label>
                <textarea name="message" required rows={4} value={inquiryData.message} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xs py-2.5 px-4 text-xs focus:outline-none focus:border-black resize-none" placeholder="Detail any specialized labels, packaging aesthetics, or custom botanical assortments you require..." />
              </div>

              <button type="submit" className="w-full bg-black hover:bg-essaara-earth text-white border border-black hover:border-essaara-earth font-sans text-xs font-bold uppercase tracking-widest py-3.5 transition-all duration-300 rounded-xs cursor-pointer shadow-xs text-center mt-2">
                Submit Corporate Request ➔
              </button>

            </form>
          )}

        </div>

      </div>

    </main>
  );
};

export default ContactPage;
