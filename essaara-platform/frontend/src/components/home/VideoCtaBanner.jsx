import React, { useRef, useState } from 'react';

const VideoCtaBanner = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayback = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="w-full bg-white py-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <div className="relative w-full aspect-[21/9] min-h-[300px] bg-neutral-900 rounded-xl overflow-hidden shadow-xs group">
        
        {/* 1. BACKGROUND HTML5 VIDEO PLAYER */}
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-woman-enjoying-a-cup-of-tea-in-nature-43004-large.mp4" // Placeholder luxury wellness clip
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-101"
        />

        {/* Dark shading filter layer for text contrast */}
        <div className="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:bg-black/25" />

        {/* 2. ABSOLUTE CENTERED TYPOGRAPHY & CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <span className="font-sans text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-white/90 drop-shadow-xs mb-1.5 md:mb-3">
            Tailored Wellness
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-widest uppercase drop-shadow-sm max-w-2xl mb-4 md:mb-6">
            Discover Your Ritual
          </h2>
          
          <a 
            href="/quiz"
            className="font-sans text-[11px] md:text-xs font-semibold tracking-widest uppercase border border-white bg-white/5 backdrop-blur-xs px-6 py-2.5 md:px-8 md:py-3 transition-all duration-300 hover:bg-white hover:text-essaara-earth hover:scale-102"
          >
            Take the Quiz
          </a>
        </div>

        {/* 3. INTERACTIVE CORNER CONTROLS */}
        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlayback}
          className="absolute bottom-4 left-4 p-2.5 rounded-md bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            // Pause Icon Graphic
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75H16.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
            </svg>
          ) : (
            // Play Icon Graphic
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Mute / Unmute Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 p-2.5 rounded-md bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            // Audio Volume Speaker Muted Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 0 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
            </svg>
          ) : (
            // Audio Volume Speaker Active Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06Zm4.44 5.66a.75.75 0 0 0-1.06 1.06A4.482 4.482 0 0 1 18.25 12c0 1.171-.447 2.238-1.17 3.03a.75.75 0 0 0 1.06 1.06A5.982 5.982 0 0 0 19.75 12a5.982 5.982 0 0 0-1.81-4.28Zm2.94-2.94a.75.75 0 1 0-1.06 1.06A8.974 8.974 0 0 1 22.25 12a8.974 8.974 0 0 1-2.41 6.16.75.75 0 1 0 1.06 1.06A10.475 10.475 0 0 0 23.75 12a10.475 10.475 0 0 0-2.87-7.28Z" />
            </svg>
          )}
        </button>

      </div>
    </section>
  );
};

export default VideoCtaBanner;
