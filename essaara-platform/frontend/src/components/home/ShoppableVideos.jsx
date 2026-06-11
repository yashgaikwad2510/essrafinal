import React, { useRef, useState } from 'react';

// Sample mock data simulating backend dynamic response
const videoFeeds = [
  {
    id: "v1",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-pouring-natural-essential-oil-into-a-bowl-43003-large.mp4", // Replace with real asset URL
    productName: "Gold Aura Soap",
    productDesc: "Handcrafted bar using Swarna Raj Bangeshwar for radiant skin.",
    price: "1,645",
    link: "/product/ess-soap-gold"
  },
  {
    id: "v2",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-burning-candle-in-a-dim-environment-42284-large.mp4",
    productName: "Jyoti To Janani Candle",
    productDesc: "100% soy wax infused with sacred plantable Vaijanti seeds.",
    price: "2,250",
    link: "/product/ess-candle-jyoti"
  }
];

const ShoppableVideos = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      
      {/* 1. Header Typography */}
      <div className="mb-10 text-left">
        <h2 className="font-serif text-xl md:text-2xl tracking-widest text-essaara-earth uppercase mb-2">
          Essaara Rituals
        </h2>
        <p className="font-sans text-xs md:text-sm text-neutral-500 tracking-wide max-w-2xl">
          Experience premium Ayurveda, share your wellness journey. Be part of our inner circle—tag <span className="font-semibold text-essaara-earth">@essaara</span> to get featured.
        </p>
      </div>

      {/* 2. Horizontal Scrollable Track */}
      <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x">
        {videoFeeds.map((feed) => (
          <VideoCard key={feed.id} feed={feed} />
        ))}
      </div>

    </section>
  );
};

// Sub-Component: Individual Video Frame with Product Attachment Banner
const VideoCard = ({ feed }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoToggle = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col min-w-[280px] md:min-w-[300px] max-w-[320px] snap-start bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-xs group">
      
      {/* VIDEO ELEMENT CONTAINER */}
      <div className="relative aspect-[9/16] bg-neutral-900 overflow-hidden cursor-pointer" onClick={handleVideoToggle}>
        <video
          ref={videoRef}
          src={feed.videoUrl}
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
        />
        
        {/* Play/Pause Overlay Indicator Badge */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-xs text-essaara-earth shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 ml-0.5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}

        {/* Floating Interactions (Visible clearly on hover) */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 hover:bg-white rounded-full text-essaara-earth shadow-xs transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* SHOPPABLE FOOTER ATTACHMENT CARD */}
      <a 
        href={feed.link} 
        className="flex items-center gap-3 p-4 bg-white border-t border-neutral-50 hover:bg-neutral-50 transition-colors duration-200"
      >
        {/* Mock Circular Image Asset Holder */}
        <div className="w-11 h-11 rounded-full bg-neutral-100 flex-shrink-0 border border-neutral-200 overflow-hidden flex items-center justify-center font-serif text-[10px] text-neutral-400">
          IMG
        </div>
        
        {/* Product Meta Descriptions */}
        <div className="flex-grow min-w-0">
          <h4 className="font-sans text-xs font-semibold text-essaara-earth uppercase truncate">
            {feed.productName}
          </h4>
          <p className="font-sans text-[10px] text-neutral-400 truncate mt-0.5">
            {feed.productDesc}
          </p>
          <p className="font-sans text-[11px] font-bold text-essaara-earth mt-1">
            INR {feed.price}
          </p>
        </div>
        
        {/* Chevron Route Indicator */}
        <div className="text-neutral-400 px-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </a>

    </div>
  );
};

export default ShoppableVideos;
