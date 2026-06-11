import React from 'react';
import { Link } from 'react-router-dom';const featuredBlog = {
  category: "Our Blog",
  title: "The Sacred Ritual of Plantable Wellness: Lighting with Intention",
  excerpt: "Elevate your daily spiritual routine with our artisanal Jyoti to Janani Soya Wax Candle. Discover the mindfulness behind conscious luxury—where a flickering flame transitions seamlessly into new botanical life once returned to the earth.",
  imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000", // Premium atmospheric workspace asset
  link: "/blog/plantable-wellness-ritual"
};

const BlogFeatureRow = () => {
  const { category, title, excerpt, imageUrl, link } = featuredBlog;

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-neutral-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: HIGH-RES EDITORIAL PHOTOGRAPHY */}
        <div className="w-full aspect-[4/3] md:aspect-[3/2] bg-neutral-50 overflow-hidden rounded-xs">
          <img 
            src={imageUrl} 
            alt="Essaara Ayurvedic Storytelling Campaign" 
            className="w-full h-full object-cover object-center transform hover:scale-101 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* RIGHT COLUMN: TEXT SYSTEM & STORYTELLING */}
        <div className="flex flex-col items-start text-left md:px-6 lg:px-12">
          
          {/* Category Label Indicator & Decorative line */}
          <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            {category}
          </span>
          <div className="w-6 h-[1px] bg-neutral-400 mt-2 mb-6" />

          {/* Main Article Header Title */}
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-essaara-earth leading-tight tracking-wide uppercase font-light mb-4 hover:text-essaara-gold transition-colors duration-200">
            <Link to={link}>{title}</Link>
          </h3>

          {/* Short Excerpt Summary Text Description */}
          <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed font-light tracking-wide mb-6">
            {excerpt}
          </p>

          {/* Premium Sharp Rectangle CTA Button Outline */}
          <Link 
            to={link}
            className="font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase border border-essaara-earth bg-white text-essaara-earth px-6 py-3 transition-all duration-300 hover:bg-essaara-earth hover:text-white flex items-center gap-2 group"
          >
            Explore Now!
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">➔</span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default BlogFeatureRow;
