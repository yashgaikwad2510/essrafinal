import React from 'react';
import { Link } from 'react-router-dom';const blogPosts = [
  {
    id: "post-1",
    category: "Rituals",
    title: "The Sacred Alchemy of Swarna Raj Bangeshwar in Skin Purity",
    excerpt: "For centuries, traditional practitioners have balanced precious elements to promote absolute radiance. Discover the historical context behind our handcrafted gold soap and how 30 distinct herbs work in perfect harmony to cleanse and nourish.",
    date: "May 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=800",
    readTime: "5 min read"
  },
  {
    id: "post-2",
    category: "Sustainability",
    title: "From Jyoti to Janani: Cultivating Life After the Flame",
    excerpt: "Conscious luxury means leaving the earth more beautiful than we found it. Step inside our guide to planting your candle residue, protecting the embedded Vaijanti seeds, and watching your space bloom into seasonal life.",
    date: "May 02, 2026",
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800",
    readTime: "4 min read"
  },
  {
    id: "post-3",
    category: "Herbal Science",
    title: "Deep Cleansing vs. Harsh Exfoliation: The Power of Pure Scrub Powders",
    excerpt: "Many modern cosmetics strip away the skin's protective lipid barrier. By utilizing raw, dry herbal powders like Shikakai, Chandan, and Nagarmotha, you can gently draw out impurities while enhancing your natural, long-lasting glow.",
    date: "April 24, 2026",
    imageUrl: "https://images.unsplash.com/photo-1607006342411-b70a10357f93?q=80&w=800",
    readTime: "6 min read"
  }
];

const BlogPage = () => {
  const featuredPost = blogPosts[0];
  const gridPosts = blogPosts.slice(1);

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto animate-fadeIn text-essaara-earth">
      
      {/* MAGAZINE HEADER BAR */}
      <div className="text-center mb-16">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-amber-800 block mb-2">
          The Journal
        </span>
        <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-widest font-light mb-3">
          Ayurvedic Wisdom & Slow Living
        </h1>
        <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
      </div>

      {/* =========================================================================
          SECTION 1: HERO FEATURE STORY (Asymmetric Banner Layout)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-neutral-200/60 p-6 md:p-8 rounded-xs shadow-3xs text-left mb-12 group">
        <div className="lg:col-span-7 aspect-[16/10] bg-neutral-50 overflow-hidden rounded-xs">
          <img 
            src={featuredPost.imageUrl} 
            alt={featuredPost.title} 
            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-101"
          />
        </div>
        <div className="lg:col-span-5 flex flex-col items-start px-2 lg:pl-6">
          <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest font-bold text-amber-800 mb-3">
            <span>{featuredPost.category}</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-400 font-normal">{featuredPost.readTime}</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl uppercase tracking-wide text-neutral-900 leading-tight mb-4 hover:text-amber-900 transition-colors">
            <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed font-light tracking-wide mb-6">
            {featuredPost.excerpt}
          </p>
          <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-400">
            {featuredPost.date}
          </span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: SECONDARY POSTS CARD GRID
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gridPosts.map((post) => (
          <div key={post.id} className="bg-white border border-neutral-200/60 p-5 rounded-xs shadow-3xs flex flex-col text-left group">
            <div className="w-full aspect-[16/10] bg-neutral-50 overflow-hidden rounded-xs mb-5">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-101"
              />
            </div>
            <div className="flex items-center gap-3 font-sans text-[9px] uppercase tracking-widest font-bold text-amber-800 mb-2.5">
              <span>{post.category}</span>
              <span className="text-neutral-300">|</span>
              <span className="text-neutral-400 font-normal">{post.readTime}</span>
            </div>
            <h3 className="font-serif text-base uppercase tracking-wide text-neutral-900 leading-snug mb-3 hover:text-amber-900 transition-colors line-clamp-2">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h3>
            <p className="font-sans text-xs text-neutral-500 leading-relaxed font-light tracking-wide mb-5 line-clamp-3">
              {post.excerpt}
            </p>
            <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-400 mt-auto">
              {post.date}
            </span>
          </div>
        ))}
      </div>

    </main>
  );
};

export default BlogPage;
