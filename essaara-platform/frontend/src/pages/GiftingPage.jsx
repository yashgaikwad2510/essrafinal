import React from 'react';
import GiftingHero from '../components/gifting/GiftingHero';
import GiftingShowcaseRowFlexible from '../components/gifting/GiftingShowcaseRowFlexible';

// Data Mock 1: Video on Left, Texture on Right (Active Stock)
const kitData1 = {
  title: "Vedic Rituals Gift Hamper",
  story: "A curated alignment of our signature products to elevate the daily bathing ritual.",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-pouring-natural-essential-oil-into-a-bowl-43003-large.mp4",
  textureImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
  productInfo: {
    id: "hamp-1",
    name: "Essaara Signature Wellness Box",
    specification: "Deluxe Combo Pack",
    price: 3850,
    stock: 15, // In Stock!
    options: [{ id: "o1", label: "Oud Base", colorCode: "#8C4F5E" }],
    productImages: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600"]
  }
};

// Data Mock 2: Texture on Left, Video on Right (Sold Out State!)
const kitData2 = {
  title: "Artisanal Candle Festival Collection",
  story: "Infused with raw botanical ingredients to purify spaces and induce absolute mental tranquility.",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-burning-candle-in-a-dim-environment-42284-large.mp4",
  textureImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600",
  productInfo: {
    id: "hamp-2",
    name: "Spiritual Janani Candle Box",
    specification: "Limited Seasonal Kit",
    price: 2450,
    stock: 0, // SOLD OUT STATE TEST
    options: [{ id: "o2", label: "Soy Wax Base", colorCode: "#D9C3B0" }],
    productImages: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600"]
  }
};

const GiftingPage = () => {
  const handleCategoryFilter = (categoryId) => {
    console.log(`Filtering gifting items dynamically by grid tag: ${categoryId}`);
  };

  return (
    <main className="pb-16 w-full">
      <GiftingHero onCategoryChange={handleCategoryFilter} />
      
      {/* Row 1: Video Left, Image Right */}
      <GiftingShowcaseRowFlexible showcaseData={kitData1} imageLeft={false} onAddToCart={() => {}} />
      
      {/* Row 2: Image Left, Video Right (Sold Out Layout) */}
      <GiftingShowcaseRowFlexible showcaseData={kitData2} imageLeft={true} onAddToCart={() => {}} />
    </main>
  );
};

export default GiftingPage;
