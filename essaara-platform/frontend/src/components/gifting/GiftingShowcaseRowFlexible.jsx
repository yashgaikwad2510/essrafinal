import React, { useState, useRef } from 'react';

const GiftingShowcaseRowFlexible = ({ showcaseData, imageLeft = false, onAddToCart }) => {
  const { title, story, videoUrl, textureImage, productInfo } = showcaseData;
  const [selectedOption, setSelectedOption] = useState(productInfo.options[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  // Check if the current product option is completely out of stock
  const isOutOfStock = productInfo.stock === 0;

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

      {/* 2. ASYMMETRIC TRI-PANEL GRID WITH FLEXIBLE COLUMN ORDER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {/* PANEL A: TEXTURE IMAGE / ART PANEL */}
        {/* Uses Tailwind's order utilities to shift positions based on props */}
        <div className={`overflow-hidden rounded-xs bg-neutral-50 ${imageLeft ? 'order-1' : 'order-1 md:order-3'}`}>
          <img 
            src={textureImage} 
            alt="Artisanal Gift Box Texture Close-Up" 
            className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* PANEL B: ACTIVE E-COMMERCE CONFIGURE CARD (Always in the center on desktop) */}
        <div className="bg-[#FBFBFA] p-6 flex flex-col justify-between rounded-xs border border-neutral-100 order-2">
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

            {/* Configurable Swatch Options */}
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

          {/* DYNAMIC BUTTON HANDLING STOCK MANAGEMENTS */}
          <button 
            onClick={() => !isOutOfStock && onAddToCart && onAddToCart(productInfo._id, selectedOption)}
            disabled={isOutOfStock}
            className={`w-full mt-5 font-sans text-xs font-medium uppercase tracking-widest py-3 transition-colors duration-300 border rounded-xs ${
              isOutOfStock 
                ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed text-center' 
                : 'bg-white hover:bg-essaara-earth hover:text-white text-essaara-earth border-essaara-earth cursor-pointer'
            }`}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
          </button>
        </div>

        {/* PANEL C: EXPERIENTIAL TEXTURE VIDEO */}
        <div 
          className={`relative aspect-[3/4] md:aspect-auto bg-neutral-900 overflow-hidden rounded-xs cursor-pointer group ${imageLeft ? 'order-3' : 'order-1'}`}
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

      </div>
    </section>
  );
};

export default GiftingShowcaseRowFlexible;
