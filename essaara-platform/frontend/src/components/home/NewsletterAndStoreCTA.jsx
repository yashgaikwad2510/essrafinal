import React, { useState } from 'react';

const NewsletterAndStoreCTA = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (consent && email) {
      console.log(`Subscribing ${email} to Essaara mailing updates pipeline.`);
      // Your backend newsletter subscription handling route hooks here
      setEmail('');
    }
  };

  return (
    <section className="w-full bg-[#FAF9F6] py-16 px-6 border-t border-neutral-100 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl w-full flex flex-col items-center">
        
        {/* =========================================================================
            PART 1: THE NEWSLETTER BLOCK
            ========================================================================= */}
        <h2 className="font-serif text-2xl md:text-3xl tracking-widest text-essaara-earth uppercase mb-4">
          Stay up to date
        </h2>
        <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed max-w-lg mb-8 font-light tracking-wide">
          Enter your email address to receive updates on new product previews, promotions, special offers, and the latest know-how on traditional wellness routines.
        </p>

        {/* PILL-SHAPED INTEGRATED FORM COMPONENT */}
        <form onSubmit={handleSubscribe} className="w-full max-w-md flex items-center bg-white rounded-full border border-neutral-800 p-1 pl-4 mb-4 focus-within:ring-1 focus-within:ring-essaara-gold transition-all">
          <input 
            type="email" 
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent text-xs font-sans tracking-widest text-essaara-earth placeholder-neutral-400 w-full focus:outline-hidden py-2"
            required
          />
          <button 
            type="submit"
            disabled={!consent}
            className="bg-black hover:bg-essaara-earth disabled:opacity-50 text-white font-sans text-[11px] font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0"
          >
            SUBSCRIBE
          </button>
        </form>

        {/* CONSENT LEGAL SUBTEXT METRICS */}
        <label className="flex items-center justify-center gap-2 cursor-pointer group mb-14">
          <input 
            type="checkbox" 
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="accent-black rounded-xs cursor-pointer w-3.5 h-3.5"
          />
          <span className="text-[10px] md:text-[11px] font-sans text-neutral-500 tracking-wide select-none">
            By proceeding ahead, I agree and accept Essaara's{' '}
            <a href="/privacy-policy" className="underline font-medium text-neutral-700 hover:text-essaara-gold">privacy policy</a> and{' '}
            <a href="/terms-of-use" className="underline font-medium text-neutral-700 hover:text-essaara-gold">terms</a>.
          </span>
        </label>

        {/* =========================================================================
            PART 2: THE LOCATION FINDER LINK COMPONENT
            ========================================================================= */}
        <div className="border-t border-neutral-200/60 w-full pt-10 flex flex-col items-center">
          <a 
            href="/contact" 
            className="group flex items-center justify-center gap-2 font-serif text-xl md:text-2xl lg:text-3xl tracking-wider text-essaara-earth uppercase hover:text-essaara-gold transition-colors duration-300"
          >
            {/* Map Pin Vector Graphic */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-essaara-earth group-hover:text-essaara-gold transition-colors">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742c1.428-.997 3.908-2.942 5.663-6.541C21.054 11.612 21 9.141 19.4 7.5c-1.3-1.334-3.164-2.13-5.4-2.13-2.236 0-4.101.796-5.4 2.13-1.6 1.641-1.654 4.112-.857 6.568 1.755 3.599 4.235 5.544 5.663 6.541a16.977 16.977 0 0 0 1.138.738Zm.46-8.851a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" clipRule="evenodd" />
            </svg>
            Find a store near you
          </a>
        </div>

      </div>
    </section>
  );
};

export default NewsletterAndStoreCTA;
