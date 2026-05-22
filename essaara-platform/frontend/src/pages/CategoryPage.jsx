import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { mockProducts } from '../data/mockProducts';

// Dynamic Content Mapping representing database states for our page banners
const categoryContent = {
  face: {
    title: "Face Care",
    tagline: "Nourishing Formulations | Timeless Herbal Brilliance",
    image: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=1600",
    capsules: ["Cleansers", "Mists & Toners", "Moisturizers", "Masques"],
    ingredients: ["Aloe Vera", "Chandan", "Neem", "Kashmiri Saffron", "Ritha"]
  },
  'bath-body': {
    title: "Bath & Body",
    tagline: "Skin Nourishing Oils | Eco-Friendly Indulgences",
    image: "https://images.unsplash.com/photo-1607006342411-b70a10357f93?q=80&w=1600",
    capsules: ["Herbal Soaps", "Bath Bombs", "Body Lotions", "Massage Oils"],
    ingredients: ["Natural Soda", "Coconut Oil", "Lavender Oil", "Rose Oil", "Tea Tree"]
  },
  candles: {
    title: "Aromatherapy Candles",
    tagline: "Hydration Infusing | Long-Lasting Scent",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1600",
    capsules: ["Soy Wax", "Spiritual", "Aromatherapy", "Plantable Concept"],
    ingredients: ["Soya Wax", "Sandalwood Essence", "Tulsi", "Vetiver", "Vaijanti Seeds"]
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams(); // Capture slug values directly from URL routing context
  const currentCategory = categoryContent[categoryId] || categoryContent['face'];

  // Filter States
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [priceRange, setPriceRange] = useState(6200);
  const [sortBy, setSortBy] = useState('bestseller');

  // Clear selections on category change
  useEffect(() => {
    setSelectedIngredients([]);
  }, [categoryId]);

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient) ? prev.filter(i => i !== ingredient) : [...prev, ingredient]
    );
  };

  // Derive products logic
  const filteredProducts = mockProducts.filter((p) => {
    // Check Category
    if (p.category !== categoryId && !(categoryId === undefined && p.category === 'face')) return false;
    
    // Check Price (using lowest variant price)
    const lowestPrice = Math.min(...p.variants.map(v => v.price));
    if (lowestPrice > priceRange) return false;

    // Check Ingredients
    if (selectedIngredients.length > 0) {
      const hasIngredient = p.ingredients?.some(ing => selectedIngredients.includes(ing));
      if (!hasIngredient) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'bestseller') {
      return (a.isBestseller === b.isBestseller) ? 0 : a.isBestseller ? -1 : 1;
    } else if (sortBy === 'low-high') {
      const minA = Math.min(...a.variants.map(v => v.price));
      const minB = Math.min(...b.variants.map(v => v.price));
      return minA - minB;
    } else if (sortBy === 'high-low') {
      const minA = Math.min(...a.variants.map(v => v.price));
      const minB = Math.min(...b.variants.map(v => v.price));
      return minB - minA;
    }
    return 0;
  });

  const handleAddToCart = (id, variant) => {
    console.log(`Added product ${id} - ${variant.size} to cart`);
  };

  const handleAddToWishlist = (id) => {
    console.log(`Wishlisted product ${id}`);
  };

  return (
    <main className="w-full">
      {/* =========================================================================
          MODULE 1: DYNAMIC CONTEXT BANNER & SHORTCUT CAPSULES
          ========================================================================= */}
      <div className="w-full bg-white flex flex-col items-center">
        <div className="relative w-full aspect-[21/6] min-h-[220px] bg-neutral-900 overflow-hidden">
          <img src={currentCategory.image} alt={currentCategory.title} className="w-full h-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center pl-8 md:pl-16 text-white">
            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-widest uppercase mb-2">
              {currentCategory.title}
            </h1>
            <p className="font-sans text-[11px] md:text-xs tracking-widest uppercase font-light text-white/90">
              {currentCategory.tagline}
            </p>
          </div>
        </div>

        {/* Sub-Category Pills Row */}
        <div className="py-6 px-4 overflow-x-auto w-full max-w-7xl flex justify-start md:justify-center gap-3 scrollbar-hide">
          {currentCategory.capsules.map((pill, idx) => (
            <button key={idx} className="font-sans text-[10px] font-medium tracking-widest uppercase px-5 py-2 rounded-full border border-neutral-300 text-neutral-600 hover:border-black hover:text-black transition-all min-w-max cursor-pointer">
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MODULE 2: CORE WORKSPACE GRID (Sidebar Filters + Products Display)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR COMPONENT COLUMN (Left 25%) */}
        <aside className="w-full md:w-[240px] flex-shrink-0 text-left border-r border-neutral-100 pr-4">
          <div className="sticky top-28 flex flex-col gap-8">
            
            <div>
              <h3 className="font-sans text-[11px] font-bold tracking-widest uppercase text-essaara-earth border-b border-neutral-100 pb-2 mb-4">
                Filter By Ingredient
              </h3>
              <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {currentCategory.ingredients.map((ing) => (
                  <label key={ing} className="flex items-center gap-2.5 text-xs font-light text-neutral-600 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedIngredients.includes(ing)}
                      onChange={() => handleIngredientToggle(ing)}
                      className="accent-black rounded-xs w-3.5 h-3.5 cursor-pointer" 
                    />
                    <span className="uppercase tracking-wider text-[11px]">{ing}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Slide Range Component */}
            <div>
              <h3 className="font-sans text-[11px] font-bold tracking-widest uppercase text-essaara-earth border-b border-neutral-100 pb-2 mb-4">
                Price Max Range
              </h3>
              <div className="px-1">
                <input 
                  type="range" 
                  min="500" 
                  max="6200" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-black h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center text-[11px] font-sans text-neutral-500 mt-2">
                  <span>₹500</span>
                  <span className="font-bold text-essaara-earth">Max: ₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* CATALOG MAIN CONTENT PANEL (Right 75%) */}
        <div className="flex-grow">
          
          {/* Sorting Controls Header Area */}
          <div className="flex justify-end items-center mb-6 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-sans text-[11px] tracking-wider uppercase">Sort By:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-neutral-200 rounded-xs py-1 px-3 text-xs font-sans text-essaara-earth uppercase tracking-wider focus:outline-hidden cursor-pointer"
              >
                <option value="bestseller">Bestseller</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Catalog Grid View Fallback (Using product card template directly) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))
            ) : (
              <p className="text-xs text-neutral-400 col-span-full italic py-8 text-center">
                No products found matching these filters. Try adjusting your selections.
              </p>
            )}
          </div>

        </div>

      </div>
    </main>
  );
};

export default CategoryPage;
