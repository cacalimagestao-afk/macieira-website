/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          white: '#ffffff',
          gold: '#c9a961',
          'gold-light': '#e8d5b5',
          'gold-dark': '#9d8555',
          green: '#1a3d3a',
          'green-light': '#2d5a52',
          red: '#8b4545',
          gray: '#1a1a1a',
          'gray-light': '#2d2d2d',
          text: '#e8e8e8',
          'text-muted': '#a0a0a0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #c9a961 0%, #9d8555 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(26, 61, 58, 0.15) 100%)',
        'gradient-accent': 'linear-gradient(90deg, #c9a961 0%, #8b4545 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 169, 97, 0.15)',
        'gold-lg': '0 8px 32px rgba(201, 169, 97, 0.2)',
      },
    },
  },
  plugins: [],
}
