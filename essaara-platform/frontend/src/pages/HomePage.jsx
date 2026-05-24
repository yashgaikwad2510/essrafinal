import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import ProductSpotlight from '../components/home/ProductSpotlight';
import BestsellerGrid from '../components/product/BestsellerGrid';
import VideoCtaBanner from '../components/home/VideoCtaBanner';
import ShoppableVideos from '../components/home/ShoppableVideos';
import AboutStoryRow from '../components/home/AboutStoryRow';
import BlogFeatureRow from '../components/home/BlogFeatureRow';
import NewsletterAndStoreCTA from '../components/home/NewsletterAndStoreCTA';

const HomePage = () => {
  return (
    <div className="w-full bg-[#FDFBF7] animate-fadeIn">
      {/* Mounted pristine blocks */}
      <HeroBanner />
      <ProductSpotlight />
      <BestsellerGrid />
      <VideoCtaBanner />
      <ShoppableVideos />
      <AboutStoryRow />
      <BlogFeatureRow />
      <NewsletterAndStoreCTA />
    </div>
  );
};

export default HomePage;
