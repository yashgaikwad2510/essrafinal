import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: "/images/banner-woman.png" },
    { id: 2, image: "/images/banner-candles.png" },
    { id: 3, image: "/images/banner-botanicals.png" },
    { id: 4, image: "/images/bathbombnner.png" }
  ];

  // Auto-rotate timeline cycling through slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    /* 
      OUTER FRAMING CONTAINER:
      px-[6px] handles your exact 5px-6px side margins flawlessly.
    */
    <div className="w-full bg-white px-[6px] pt-2 pb-4 max-w-[1440px] mx-auto select-none">
      
      {/* 
        THE HOLE BANNER BUTTON:
        Clicking anywhere on this section instantly triggers navigate('/shop').
        'cursor-pointer group' gives the customer smooth feedback on hover.
      */}
      <button 
        onClick={() => navigate('/shop')}
        className="w-full relative bg-[#E1C9C3] overflow-hidden rounded-2xl aspect-[16/5] min-h-[350px] md:min-h-[420px] block border-none p-0 cursor-pointer group shadow-xs hover:shadow-md transition-shadow duration-300"
        aria-label="Explore the Essaara Collection"
      >
        
        {/* =========================================================================
            BACKGROUND SLIDES: RAW, TOUCHLESS VISUAL CHRONOLOGY
            ========================================================================= */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-101"
              }`}
            >
              <img 
                src={slide.image} 
                alt={`Essaara Brand Campaign ${slide.id}`}
                /* 
                  group-hover:scale-101 subtly shifts the entire uncropped image 
                  on hover for an ultra-premium boutique interaction layer.
                */
                className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.01]"
              />
            </div>
          ))}
        </div>

        {/* Subtle dark ambient under-glow hint at the very bottom edge just to elevate composition depth */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-10" />

      </button>
    </div>
  );
};

export default HeroBanner;
