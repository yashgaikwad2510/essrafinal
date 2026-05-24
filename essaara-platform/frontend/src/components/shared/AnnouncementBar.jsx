import React from 'react';

const AnnouncementBar = () => {
  // Brand metrics and core taglines compiled straight from your documents
  const offers = [
    "Purely Ayurvedic • Naturally Divine",
    "Handcrafted in Small Batches with Love and Mindfulness",
    "100% Organic, Ayurveda-Inspired, and Eco-Conscious Ingredients",
    "Free Shipping on Premium Orders Above ₹1500",
    "Essaara: From the Earth, For the Soul"
  ];

  // We duplicate the string sequence to form a perfect endless loop link
  const continuousList = [...offers, ...offers, ...offers];

  return (
    <div className="w-full bg-neutral-950 text-white overflow-hidden py-2 border-b border-neutral-900 select-none relative z-50">
      <div className="flex w-[300%] animate-marquee-right whitespace-nowrap items-center">
        {continuousList.map((text, idx) => (
          <div key={idx} className="flex items-center mx-6">
            {/* Minimalist divider star */}
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#E1C9C3]/90">
              {text}
            </span>
            <span className="text-xs text-[#E1C9C3]/40 ml-12">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
