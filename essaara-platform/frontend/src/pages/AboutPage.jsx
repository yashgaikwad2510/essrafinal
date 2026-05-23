import React from 'react';

const AboutPage = () => {
  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto animate-fadeIn text-essaara-earth">
      
      {/* SECTION 1: HERO TITLE & ESSENCE */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="font-sans text-[10px] uppercase tracking-[0.35em] font-bold text-amber-800 block mb-3">
          The Story of Earth, Soul & Scent
        </span>
        <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-widest font-light mb-6 leading-tight">
          Born from the Soil
        </h1>
        <div className="w-12 h-[1px] bg-neutral-300 mx-auto mb-6" />
        <p className="font-sans text-xs md:text-sm text-neutral-600 leading-relaxed tracking-wide font-light italic">
          "A name that whispers elegance, serenity, and the spirit of the soil it comes from."
        </p>
      </div>

      {/* SECTION 2: THE ORIGIN SPLIT ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        
        {/* Left Column: Artistic Asset Frame */}
        <div className="lg:col-span-5 w-full">
          <div className="w-full aspect-[4/5] bg-white border border-neutral-200/40 rounded-xs p-4 shadow-xs relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600" // Replace with an authentic photo of Sangola's land, flowers, or raw elements later
              alt="Sangola Earth and Petals" 
              className="w-full h-full object-cover rounded-xs filter grayscale-[20%] group-hover:scale-101 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Column: Narrative Text Block */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left lg:pl-6">
          <h2 className="font-serif text-2xl uppercase tracking-wider text-neutral-950 mb-6 font-light">
            The Heart of Sangola
          </h2>
          <div className="flex flex-col gap-5 font-sans text-xs md:text-sm text-neutral-600 leading-relaxed tracking-wide font-light">
            <p>
              Born from the heart of Sangola, a land rich in authenticity, Essaara began as a dream to bring back the purity of Indian earth in its most graceful form.
            </p>
            <p>
              Founder <strong>Krishnai Salunkhe Patil</strong> grew up surrounded by the colors, aromas, and textures of her homeland, where every flower carried a story, every fragrance carried emotion, and every ritual was deeply rooted in nature’s wisdom. Out of this connection was born Essaara.
            </p>
            <p>
              At Essaara, we believe that beauty and wellness begin with harmony—between nature and craft, between culture and modern living. Our creations are inspired by Ayurveda, Indian flora, and mindful living, blending ancient practices with a modern, minimalist aesthetic.
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 3: CRAFT & PHILOSOPHY CALLOUT (Full Width Thin Panel) */}
      <div className="w-full bg-[#FAF8F2] border border-neutral-200/30 rounded-xs p-8 md:p-12 text-center max-w-5xl mx-auto mb-24">
        <span className="font-sans text-[9px] uppercase tracking-[0.4em] font-bold text-amber-800 block mb-2">
          Our Philosophy
        </span>
        <h3 className="font-serif text-xl md:text-2xl uppercase tracking-widest text-neutral-950 font-light mb-4">
          To create experiences that heal, calm, and connect—one scent, one petal, one soul at a time.
        </h3>
        <p className="font-sans text-xs text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
          From scented candles and perfume oils to dried floral hampers and artisanal gifts, each piece is handpicked, slow-crafted, and soul-touched. We work closely with local artisans and flower farmers, ensuring that everything we create honors the land it comes from sustainably, ethically, and beautifully.
        </p>
      </div>

      {/* SECTION 4: THE PILLARS (OUR PROMISE) */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 block mb-2">
            Pure & Transparent
          </span>
          <h2 className="font-serif text-2xl uppercase tracking-widest text-neutral-950 font-light">
            Our Promise to You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white border border-neutral-100 rounded-xs p-6 text-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-amber-800 font-serif text-xs">I</div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">100% Organic</h4>
            <p className="font-sans text-[11px] text-neutral-500 font-light leading-relaxed">
              Ayurveda-inspired and eco-conscious ingredients. Handcrafted in small batches with love and mindfulness.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-neutral-100 rounded-xs p-6 text-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-amber-800 font-serif text-xs">II</div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">Culturally Rooted</h4>
            <p className="font-sans text-[11px] text-neutral-500 font-light leading-relaxed">
              Deeply linked to traditional Indian culture, while carefully designed to complement the modern, minimal world.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-neutral-100 rounded-xs p-6 text-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-amber-800 font-serif text-xs">III</div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">Absolute Truth</h4>
            <p className="font-sans text-[11px] text-neutral-500 font-light leading-relaxed">
              No parabens, no synthetic dyes, and no corporate shortcuts. Only pure, untouched nature's truth.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER CODA */}
      <div className="text-center pt-12 border-t border-neutral-100 mt-16">
        <span className="font-serif text-lg tracking-[0.2em] uppercase text-neutral-900 block font-light">
          Essaara
        </span>
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-amber-900 block mt-1 font-medium">
          From the Earth, For the Soul.
        </span>
      </div>

    </main>
  );
};

export default AboutPage;
