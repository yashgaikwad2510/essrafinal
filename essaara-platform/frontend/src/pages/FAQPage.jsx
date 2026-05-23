import React, { useState } from 'react';

const faqData = [
  {
    id: 1,
    category: "Product Care",
    question: "How should I store my Essaara Handmade Ayurvedic Soap?",
    answer: "To preserve its natural essence and maximize longevity, always keep the soap in a dry place after use. We recommend using a well-drained soap dish. Store your unused bars in a cool, dry place away from direct sunlight."
  },
  {
    id: 2,
    category: "Sustainability",
    question: "How does the 'From Jyoti to Janani' plantable candle work?",
    answer: "Once your medicinal soy wax candle burns fully and cools down, remove the outer packaging. Place the wax residue containing the embedded Vaijanti or Gunja seeds directly into moist soil. Water it regularly and watch your candle transform into new botanical life!"
  },
  {
    id: 3,
    category: "Ingredients & Safety",
    question: "Are Essaara products completely free from chemicals?",
    answer: "Yes, our formulations are 100% herbal and chemical-free. We formulate strictly without parabens, sulphates, or synthetic chemical preservatives to ensure absolute safety for all skin types."
  },
  {
    id: 4,
    category: "Shipping & Orders",
    question: "How long do the products stay fresh?",
    answer: "Our handmade soaps, plantable candles, and perfume oils carry a shelf life of 3 years from the manufacturing date. Our completely natural dry herbal scrubs are fresh for 1 year from manufacturing."
  }
];

const FAQPage = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto animate-fadeIn text-essaara-earth">
      
      {/* PAGE HEADER */}
      <div className="text-center mb-12">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-amber-800 block mb-2">
          Customer Care
        </span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light mb-3">
          Frequently Asked Questions
        </h1>
        <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
      </div>

      {/* ACCORDION CONTAINER LOOP */}
      <div className="flex flex-col gap-4">
        {faqData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div 
              key={item.id} 
              className="bg-white border border-neutral-200/70 rounded-xs overflow-hidden transition-all duration-300 shadow-3xs"
            >
              {/* ACCORDION HEADER TRIGGER */}
              <button
                onClick={() => toggleFaq(item.id)}
                className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-hidden group cursor-pointer"
              >
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-sans text-[9px] font-bold tracking-widest text-amber-800 uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-sm md:text-base tracking-wide font-medium text-neutral-800 group-hover:text-amber-900 transition-colors">
                    {item.question}
                  </h3>
                </div>

                {/* Animated Plus/Minus Vector Icon */}
                <div className="flex-shrink-0 w-5 h-5 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-neutral-400 group-hover:text-black transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className={`w-3 h-3 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </button>

              {/* ACCORDION SLIDE CONTAINER PANEL */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden text-left ${
                  isOpen ? 'max-h-[300px] border-t border-neutral-100' : 'max-h-0'
                }`}
              >
                <div className="p-6 bg-[#FAF9F6] font-sans text-xs md:text-sm text-neutral-600 leading-relaxed tracking-wide">
                  {item.answer}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </main>
  );
};

export default FAQPage;
