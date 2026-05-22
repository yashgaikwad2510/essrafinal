import React, { useState } from 'react';

const showcaseHamper = {
  title: "Vedic Rituals Gift Hamper",
  story: "A curated alignment of our signature Gold Aura Soap and Jyoti to Janani plantable candle, nestled alongside premium copper therapeutic tools to cleanse spaces and elevate the daily bathing ritual into a spiritual sanctuary.",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-pouring-natural-essential-oil-into-a-bowl-43003-large.mp4",
  textureImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600", // High-end close up texture/packaging
  productInfo: {
    id: "hamp-1",
    name: "Essaara Signature Wellness Box",
    specification: "Deluxe Combo Pack",
    price: 3850,
    options: [
      { id: "opt-1", label: "Sandalwood Base", colorCode: "#C29B6E" },
      { id: "opt-2", label: "Rose & Oud Base", colorCode: "#8C4F5E" },
      { id: "opt-3", label: "Jasmine Base", colorCode: "#D9C3B0" }
    ],
    productImages: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600" // Product item render
    ]
  }
};

const GiftingShowcaseRow = ({ onAddToCart }) => {
  const { title, story, videoUrl, textureImage, productInfo } = showcaseHamper;
  const [selectedOption, setSelectedOption] = useState(productInfo.options[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = React.useRef(null);

  const handleVideoClick = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-neutral-100">
      
      {/* 1. NARRATIVE HEADER STACK */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-serif text-2xl md:text-3xl tracking-widest text-essaara-earth uppercase mb-4">
          {title}
        </h2>
        <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed font-light tracking-wide">
          {story}
        </p>
      </div>

      {/* 2. ASYMMETRIC TRI-PANEL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {/* PANEL A: APPLICATION / UNBOXING VIDEO */}
        <div 
          className="relative aspect-[3/4] md:aspect-auto bg-neutral-900 overflow-hidden rounded-xs cursor-pointer group"
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
          {/* Subtle Video Overlay Indicator */}
          {!isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white/90 text-essaara-earth flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-0.5">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* PANEL B: ACTIVE E-COMMERCE CONFIGURE CARD */}
        <div className="bg-[#FBFBFA] p-6 flex flex-col justify-between rounded-xs border border-neutral-100">
          <div className="w-full aspect-square flex items-center justify-center overflow-hidden p-4 mb-4">
            <img 
              src={productInfo.productImages[0]} 
              alt={productInfo.name} 
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col flex-grow text-left">
            <h3 className="font-sans text-sm font-semibold tracking-wide text-essaara-earth uppercase">
              {productInfo.name}
            </h3>
            <p className="font-sans text-[11px] text-neutral-400 mt-1 uppercase tracking-wider">
              {productInfo.specification}
            </p>

            {/* Configurable Swatch Circles */}
            <div className="flex items-center gap-2.5 my-4">
              {productInfo.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option)}
                  style={{ backgroundColor: option.colorCode }}
                  className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative ${
                    selectedOption.id === option.id 
                      ? 'scale-110 ring-1 ring-offset-2 ring-essaara-earth' 
                      : 'hover:scale-105 opacity-80'
                  }`}
                  title={option.label}
                />
              ))}
            </div>

            <p className="font-sans text-sm font-bold text-essaara-earth mt-auto pt-2">
              ₹{productInfo.price.toLocaleString('en-IN')}.00
            </p>
          </div>

          <button 
            onClick={() => onAddToCart && onAddToCart(productInfo._id, selectedOption)}
            className="w-full mt-5 bg-white hover:bg-essaara-earth hover:text-white text-essaara-earth border border-essaara-earth font-sans text-xs font-medium uppercase tracking-widest py-3 transition-colors duration-300 cursor-pointer"
          >
            Add to Bag
          </button>
        </div>

        {/* PANEL C: CREATIVE PACKAGING / TEXTURE ART */}
        <div className="overflow-hidden rounded-xs bg-neutral-50">
          <img 
            src={textureImage} 
            alt="Artisanal Gift Box Texture Close-Up" 
            className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-1000 ease-out"
          />
        </div>

      </div>
    </section>
  );
};

export default GiftingShowcaseRow;
