import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <main className="w-full bg-[#FDFBF7] min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto animate-fadeIn text-essaara-earth text-left">
      
      <div className="border-b border-neutral-200/60 pb-6 mb-10">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-amber-800 block mb-2">
          Legal Compliance
        </span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light mb-3">
          Privacy Policy
        </h1>
        <p className="font-sans text-[11px] text-neutral-400 uppercase tracking-wider font-light">
          Last Updated: May 2026
        </p>
      </div>

      <div className="flex flex-col gap-8 font-sans text-xs md:text-sm text-neutral-600 leading-relaxed tracking-wide font-light">
        
        <section>
          <h2 className="font-serif text-lg text-neutral-900 uppercase tracking-wider mb-3 font-medium">
            1. Information Collection and Handling
          </h2>
          <p className="mb-3">
            At Essaara, we hold your personal sanctuary data in absolute privacy and confidence. When you interact with our storefront, we securely collect necessary checkout details such as your full name, shipping destination address, mobile contact number, and electronic mail coordinates to process your transactional orders safely.
          </p>
          <p>
            When you affirmatively click the consent opt-in box on our integrated newsletter subscription capsules, your electronic mail address is logged to safely process product updates, promotional previews, and Ayurvedic slow-living wellness guides.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg text-neutral-900 uppercase tracking-wider mb-3 font-medium">
            2. Data Protection and Security
          </h2>
          <p>
            We implement modern encryption algorithms to protect your transactional data. Your checkout choices are kept safe, and we never rent, barter, trade, or distribute your private contact metrics or shipping profiles to third-party data collection agencies. All background tracking is utilized purely to manage live inventory states, optimize cart calculations, or deliver custom client packages accurately.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg text-neutral-900 uppercase tracking-wider mb-3 font-medium">
            3. User Legal Rights
          </h2>
          <p>
            You retain absolute oversight and ownership regarding your registered information. You may request to edit, correct, or scrub your logged details from our system databases at any time by connecting directly with our customer desk hotline at +91 91091 01059.
          </p>
        </section>

      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
