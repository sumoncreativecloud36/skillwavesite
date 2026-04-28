/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0B0F19',
          deep: '#0A2540',
          card: '#0D1526',
        },
        cyan: {
          glow: '#00D4FF',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#A0AEC0',
        },
      },
      fontFamily: {
        bn: ['"Hind Siliguri"', 'Inter', 'sans-serif'],
        head: ['"Hind Siliguri"', 'Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'page': 'linear-gradient(160deg, #0B0F19, #0A2540)',
        'hero': 'linear-gradient(135deg, #0A2540, #00D4FF15)',
        'btn': 'linear-gradient(90deg, #00D4FF, #1E3A8A)',
        'heading': 'linear-gradient(90deg, #00D4FF, #FFFFFF)',
      },
      boxShadow: {
        'card-hover': '0 8px 30px #00D4FF18',
        'glow': '0 0 40px #00D4FF22',
        'focus': '0 0 8px #00D4FF44',
      },
    },
  },
  plugins: [],
};
