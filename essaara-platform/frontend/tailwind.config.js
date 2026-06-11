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
      },
      animation: {
        'marquee-right': 'marquee-right 25s linear infinite',
        'slideDown': 'slideDown 0.3s ease-out forwards',
        'scaleIn': 'scaleIn 0.2s ease-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-in-out forwards',
      },
      keyframes: {
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'slideDown': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scaleIn': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
