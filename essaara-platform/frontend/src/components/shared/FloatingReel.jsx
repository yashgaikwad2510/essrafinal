import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';const FloatingReel = () => {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Auto-play insurance for modern browsers (ensures muted playback starts immediately)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay blocked by browser, waiting for user interaction:", error);
      });
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn select-none shadow-2xl">
      <div className="relative w-[130px] sm:w-[160px] aspect-[9/16] bg-neutral-900 rounded-xl overflow-hidden border border-white/20 group">
        
        {/* =========================================================================
            NATIVE HTML5 VIDEO PLAYER (Plays constantly, loops infinitely, perfectly silent)
            ========================================================================= */}
        <video
          ref={videoRef}
          src="/images/eraarabanner.mp4"
          loop={true}
          muted={true}
          playsInline={true}
          autoPlay={true}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(error => {
                console.log("Reel loop play error:", error);
              });
            }
          }}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => navigate('/shop')} // Direct tap redirects directly to your storefront catalog
        />

        {/* =========================================================================
            OVERLAY CONTROLS
            ========================================================================= */}
        
        {/* Floating Close Cross Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/40 backdrop-blur-xs text-white text-[10px] flex items-center justify-center hover:bg-black/80 transition-colors border-none cursor-pointer z-30"
          title="Close Video"
        >
          ✕
        </button>

        {/* Ambient Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

        {/* Luxury Expand / Link Out Monogram Overlay on Hover */}
        <div 
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-20"
          onClick={() => navigate('/shop')}
        >
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
            {/* Minimalist expand link icon arrow matching the screenshot token */}
            <span className="text-neutral-950 text-xs font-bold font-sans">↗</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FloatingReel;
