/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          hover: '#E5C158',
          dark: '#B38F24',
          glow: 'rgba(212, 175, 55, 0.3)'
        },
        charcoal: {
          light: '#3E3E3E',
          DEFAULT: '#2E2E2E',
          dark: '#1E1E1E',
          darker: '#141414'
        },
        vyora: {
          black: '#0A0A0A',
          card: '#121212',
          lightBg: '#FAFAFA',
          lightCard: '#FFFFFF',
          lightBorder: '#E5E7EB'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'gold-subtle': 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.02) 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'light-glass': 'linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.01) 100%)'
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.35)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}
