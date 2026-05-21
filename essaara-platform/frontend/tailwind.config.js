/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Ayurvedic Color Scheme
        'essaara-gold': '#D4AF37',       // Premium accent color for badges/borders
        'essaara-earth': '#2C2520',      // Deep charcoal/brown for high-contrast headers
        'essaara-cream': '#FDFBF7',      // Off-white canvas background for maximum elegance
        'essaara-sand': '#F4EFE6',       // Muted background containers for cards
      },
      fontFamily: {
        // The typography setup is the most critical part of a premium site
        serif: ['"Playfair Display"', 'Cinzel', 'serif'], 
        sans: ['Montserrat', 'Inter', 'sans-serif'],    
      },
      letterSpacing: {
        widest: '.2em',                  // Crucial for navigation links and sub-headers
      }
    },
  },
  plugins: [],
}
