// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This path should point to all your template files
    './index.html',
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'cursive'], // Add Comfortaa font
        exo: ['Exo', 'sans-serif'],
      },
      animation: {
        spinSlow: 'spin 3s linear infinite', // Customize speed
      },
      colors: {
        primary: {
          100: "#F9F9FB",
          200: "#ebe5ff",
          500: "#4517eb",
          700: "#09006d",
          900: "#040033"
        },
      },
      screens: {
        'xs-sm': '350px',   // Extra small – custom, below Tailwind's `sm`
        'sm-md': '400px',   // Between `sm` and `md`
        'md-lg': '500px',   // Between `md` and `lg`
        'lg-xl': '950px',   // Between `lg` and `xl`
      }
      // backgroundImage: {
      //   'custom-gradient': 'linear-gradient(90deg, #001F3E, #203DA3, #3752E9)',
      // },
    },
  },
  plugins: [],
}