import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import BestsellerGrid from '../components/product/BestsellerGrid';
import AboutStoryRow from '../components/home/AboutStoryRow';

const HomePage = () => {
  return (
    <div className="w-full bg-[#FDFBF7] animate-fadeIn">
      {/* Mounted pristine blocks */}
      <HeroBanner />
      <BestsellerGrid />
      <AboutStoryRow />
    </div>
  );
};

export default HomePage;
