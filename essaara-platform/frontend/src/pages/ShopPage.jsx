import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ESSAARA_PRODUCTS = [
  {
    id: "ess-soap-gold",
    name: "Handmade Ayurvedic Gold Soap",
    category: "Snan (Bath)",
    price: 799,
    weight: "100 gm",
    tagline: "A divine blend of herbs & gold, for the skin that glows with purity",
    image: "/images/sope.png",
    ingredients: "Swarna Raj Bangeshwar, Gulvel Satva (Tinospora cordifolia), Neem, Rakta Chandan, Aloe Vera, Tulsi, Vetiver (Songeru), Manjistha, Daruharidra, Shikekai, Reetha, Saptarangi, and pure botanicals.",
    howToUse: [
      "Gently lather the soap with water.",
      "Apply to face and body in circular motions.",
      "Rinse well and pat dry.",
      "For best results, use twice daily."
    ],
    otherInfo: "Tip: Keep the soap in a dry place after use to preserve its natural essence."
  },
  {
    id: "ess-dragonfly-candle",
    name: "Both Dragonfly Signature Candle",
    category: "Elements (Home)",
    price: 1699,
    weight: "Standard Size (6cm base)",
    tagline: "Encourages the idea of giving back to nature—one candle, one tree.",
    image: "/images/candel.png",
    ingredients: "Medicinal Soy wax, Blend of Sandalwood, Tulsi, Vetiver and rose essence. Features Vaijanti Seeds or Gunja seeds at the base.",
    howToUse: [
      "Let the candle burn fully and cool.",
      "Remove the outer cup or packaging.",
      "Place the wax residue with Vaijanti seeds in moist soil.",
      "Water regularly and watch your candle turn into a new life."
    ],
    otherInfo: "Spiritual & Emotional Benefits: Promotes mental peace and positivity. Ideal for daily puja, meditation, yoga, and relaxation rituals. Adds a sacred, calming glow."
  },
  {
    id: "ess-perfume-10ml",
    name: "Signature Perfume Oil",
    category: "Scent (Aroma)",
    price: 699,
    weight: "10 ml",
    tagline: "From Jyoti to Janani - the light that becomes life",
    image: "/images/perfume.png",
    ingredients: "Prajakta Flower, Essential oils, Natural fixatives, Purified water.",
    howToUse: [
      "Apply a few drops to clean, moisturized skin at your pulse points (wrists, neck, behind ears, inner elbows).",
      "Gently dab, do not rub, to let the skin's warmth diffuse the scent naturally."
    ],
    otherInfo: "Storage: Store in a cool, dry place away from direct sunlight. Avoid contact with eyes. For external use."
  },
  {
    id: "ess-scrub-neem",
    name: "Natural Glow Body Scrub (Neem)",
    category: "Snan (Bath)",
    price: 349,
    weight: "70 gm",
    tagline: "Natural Glow | Pure Herbs | Timeless Beauty",
    image: "/images/bathscrb.png",
    ingredients: "Shikakai, Chandan, Ritha, Bavchi, Sugandhi Kachora, Vetiver, Nagarmotha, Kali Halad.",
    howToUse: [
      "Take 1-2 tsp of the scrub.",
      "Mix with rose water, milk, or aloe vera gel to form a paste.",
      "Apply gently on a damp face and neck in circular motions.",
      "Leave for 5-10 minutes, then rinse with lukewarm water.",
      "Use 2-3 times a week for visible radiance."
    ],
    otherInfo: "100% Herbal & Chemical-Free. No Paraben, No Sulphate, No Preservatives. Deep Cleansing + Gentle Exfoliation."
  },
  {
    id: "ess-bathbomb-combo",
    name: "Combo of 2 Bath Bomb",
    category: "Snan (Bath)",
    price: 499,
    weight: "30 gm each",
    tagline: "pushpa snan - A luxurious, effervescent floral immersion",
    image: "/images/bathbom.png",
    ingredients: "Dried petals of Rose, Hibiscus, Jasmine oil, Marigold, Essential oils, Epsom salt, citric acid, and Bicarbonate soda.",
    howToUse: [
      "Unwrap the bath bomb and drop it into a tub filled with warm, comfortable water.",
      "Let it fizz and fully dissolve.",
      "Get in the water to enjoy a deeply relaxing and moisturizing experience."
    ],
    otherInfo: "Expiry: 3 years from manufacturing date. Perfect for luxury self-care rituals."
  }
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeRitualProduct, setActiveRitualProduct] = useState(null);

  const categories = ["All", "Snan (Bath)", "Elements (Home)", "Scent (Aroma)"];

  const filteredProducts = selectedCategory === "All"
    ? ESSAARA_PRODUCTS
    : ESSAARA_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto text-neutral-900 font-sans">
      
      {/* HEADER PANEL */}
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-amber-900/80 block mb-2">
          Purely Ayurvedic • Naturally Divine
        </span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.15em] font-light text-neutral-950">
          The Storefront Collection
        </h1>
        <div className="w-12 h-[1px] bg-neutral-200 mx-auto mt-4" />
      </div>

      {/* FILTERS */}
      <div className="flex justify-center gap-6 md:gap-8 border-b border-neutral-100 pb-4 mb-12 text-[11px] font-bold tracking-widest uppercase overflow-x-auto whitespace-nowrap scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveRitualProduct(null);
            }}
            className={`pb-2 transition-all cursor-pointer bg-transparent border-none ${
              selectedCategory === cat 
                ? "text-neutral-950 border-b-2 border-neutral-950 font-black" 
                : "text-neutral-400 hover:text-neutral-950"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* REPLICATED SHOP GRID FROM DESIGN image_552988.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
        {filteredProducts.map((product) => {
          const isSelected = activeRitualProduct?.id === product.id;
          
          return (
            <div key={product.id} className="w-full flex flex-col">
              
              {/* THE EXACT CARD TEMPLATE FRAME */}
              <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl flex flex-col text-left shadow-xs transition-shadow hover:shadow-md">
                
                {/* 1:1 SQUARE IMAGE WINDOW */}
                <div className="w-full aspect-square bg-[#FAF9F6] relative rounded-xl overflow-hidden flex items-center justify-center p-6 mb-5">
                  
                  {/* Floating Top Right Dismiss/Action Cross Icon */}
                  <button 
                    onClick={() => setActiveRitualProduct(isSelected ? null : product)}
                    className="absolute top-2.5 right-2.5 text-neutral-300 hover:text-neutral-600 transition-colors bg-transparent border-none text-base cursor-pointer z-20"
                  >
                    ✕
                  </button>

                  {product.image ? (
                    <Link to={`/product/${product.id}`} className="absolute inset-0 w-full h-full z-10">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </Link>
                  ) : (
                    /* Placeholder Art Monogram Layer */
                    <Link to={`/product/${product.id}`} className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-neutral-50 to-[#FAF7F2] z-10 hover:text-black">
                      <span className="font-serif text-4xl font-extralight text-neutral-200/80 tracking-widest">
                        E
                      </span>
                      <p className="text-[9px] font-sans uppercase tracking-widest text-neutral-400/80 max-w-[85%] mt-2 leading-relaxed">
                        {product.name}
                      </p>
                    </Link>
                  )}
                </div>

                {/* PRODUCT TITLE - UPPERCASE WITH TRUNCATION */}
                <Link to={`/product/${product.id}`} className="no-underline text-neutral-900 hover:text-black block mb-1">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider truncate">
                    {product.name}
                  </h3>
                </Link>

                {/* TAGLINE OVERLAY - LIGHT GREY UPPERCASE */}
                <p className="font-sans text-[10px] text-neutral-400 uppercase tracking-wide font-normal truncate mb-4">
                  {product.tagline}
                </p>

                {/* WEIGHT & PRICE MATRIX ROW */}
                <div className="flex justify-between items-center text-left mb-5 pt-1 border-t border-neutral-50">
                  <span className="font-sans text-[11px] text-neutral-400 font-light">
                    {product.weight}
                  </span>
                  <span className="font-sans text-xs font-bold text-neutral-950">
                    ₹{product.price}.00
                  </span>
                </div>

                {/* FULL-WIDTH ANCHORED ACTION BUTTON */}
                <button className="w-full bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] py-3.5 hover:bg-neutral-900 rounded-lg transition-colors shadow-sm cursor-pointer border-none mt-auto z-20 relative">
                  Move To Bag
                </button>

              </div>

              {/* OPTIONAL EXPANDED DISCLOSURE SECTION */}
              {isSelected && (
                <div className="w-full bg-[#FAF8F3] border border-amber-900/10 rounded-xl p-5 mt-3 text-left animate-slideDown shadow-inner">
                  <div className="mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-0.5">Ingredients</span>
                    <p className="text-[11px] text-neutral-700 font-light leading-relaxed">{product.ingredients}</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">The Sacred Ritual</span>
                    <ol className="list-decimal list-inside text-[11px] text-neutral-700 font-light flex flex-col gap-1 leading-relaxed">
                      {product.howToUse.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </main>
  );
};

export default ShopPage;
