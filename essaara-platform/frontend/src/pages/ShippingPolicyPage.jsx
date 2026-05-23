import React from 'react';

const ShippingPolicyPage = () => {
  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto animate-fadeIn text-essaara-earth text-left">
      
      <div className="border-b border-neutral-200/60 pb-6 mb-10">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-amber-800 block mb-2">
          Operations & Logistics
        </span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light mb-3">
          Shipping & Delivery Policy
        </h1>
        <p className="font-sans text-[11px] text-neutral-400 uppercase tracking-wider font-light">
          Domestic Logistics Guide
        </p>
      </div>

      <div className="flex flex-col gap-8 font-sans text-xs md:text-sm text-neutral-600 leading-relaxed tracking-wide font-light">
        
        <section>
          <h2 className="font-serif text-lg text-neutral-900 uppercase tracking-wider mb-3 font-medium">
            1. Processing and Dispatch Windows
          </h2>
          <p>
            Because our product matrix features handcrafted small-batch compositions—including delicate handmade gold soaps and plantable soy candles—orders are handled with absolute care. Standard domestic processing takes 1 to 3 business days from the moment your checkout payment or COD preference is confirmed before leaving our laboratories.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg text-neutral-900 uppercase tracking-wider mb-3 font-medium">
            2. Estimated Logistics Timelines
          </h2>
          <p className="mb-3">
            Once dispatched from our facility hubs, transit delivery follows these target schedules across domestic postal networks:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mb-2 uppercase tracking-wide text-[11px] font-medium text-neutral-700">
            <li>Metropolitan Zones & Tier 1 Cities: 3 — 5 Business Days.</li>
            <li>Tier 2 & Regional India Areas: 5 — 7 Business Days.</li>
          </ul>
          <p>
            As structured inside our interactive checkout calculation summaries, orders carrying basket subtotals exceeding ₹1,500 enjoy complimentary premium tracking shipping across our networks. Orders below this threshhold carry a standard flat handling fee of ₹150.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg text-neutral-900 uppercase tracking-wider mb-3 font-medium">
            3. Parcel Inspections and Assistance
          </h2>
          <p>
            Should a package sustain visible duress or cosmetic fracturing during transit, please photograph the unopened consignment layer immediately and dispatch it to our care coordinators at +91 91091 01059 or email our service desks to deploy immediate replacements.
          </p>
        </section>

      </div>
    </main>
  );
};

export default ShippingPolicyPage;
