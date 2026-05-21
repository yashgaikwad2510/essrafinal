import React from 'react';
import BestsellerGrid from '../components/product/BestsellerGrid';
import ShoppableVideos from '../components/home/ShoppableVideos';

const Home = () => {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] bg-essaara-sand flex items-center overflow-hidden">
        {/* Left Side: Image container */}
        <div className="absolute inset-y-0 left-0 w-1/2 h-full">
           <img 
              src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2000&auto=format&fit=crop" 
              alt="High-end ayurvedic ingredients" 
              className="object-cover w-full h-full object-right"
           />
           {/* Soft gradient overlay */}
           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-essaara-sand to-transparent"></div>
        </div>

        {/* Right Side: Typography Stack */}
        <div className="relative z-10 w-1/2 ml-auto flex flex-col justify-center px-16 h-full bg-essaara-sand">
          <div className="max-w-lg">
            <p className="text-xs font-sans tracking-widest uppercase text-gray-500 mb-6">
              The Perfect Formula. Uniquely Yours.
            </p>
            
            <h2 className="text-6xl font-serif text-essaara-earth font-light leading-tight mb-10 tracking-wide">
              CUSTOMISED<br />SKINCARE
            </h2>
            
            {/* The CTA Button */}
            <div>
              <button className="bg-white text-essaara-earth font-sans text-sm tracking-widest uppercase px-8 py-3 border border-gray-200 hover:bg-essaara-gold hover:text-white hover:border-essaara-gold transition-all duration-300 cursor-pointer">
                Discover Your Ritual
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Signature Collection Grid replaced with BestsellerGrid per user request */}
      <BestsellerGrid />

      {/* Shoppable Video Feeds Section */}
      <ShoppableVideos />
    </main>
  );
};

export default Home;
