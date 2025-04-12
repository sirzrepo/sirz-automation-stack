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
        // blue
        colorBlueDeep: '#3752E9',
        colorBlueLight: '#CED7FE',

        // green
        colorGreen: "#3ACBCC",
        colorGreenLight: "#71D9DA",
        colorGreenDeeper: "#001F3E",

        colorNeutra: "#EBE6E6",

        // light mode
        colorLight: '#FAFAFA',
        colorDefaultLight: '#FFFFFF',

        // dark mode
        colorDark: '#1B1F23',
        colorDefaultDark: '#000000',
      },
      backgroundImage: {
        salesFunnelBackgroundGradient: "linear-gradient(to right, #001F3E, #203DA3, #3752E9)",
        'dashboard-form-gradient': 'linear-gradient(90deg, #001F3E, #203DA3, #3752E9)',
        'text-gradient': 'linear-gradient(90deg, #001F3E, #203DA3, #3752E9)',
      },
      screens: {
        xxm: "950px",
        xxl: "500px",
        xxxm: "400px",
        xxxxm: "350px"
      },
      // backgroundImage: {
      //   'custom-gradient': 'linear-gradient(90deg, #001F3E, #203DA3, #3752E9)',
      // },
    },
  },
  plugins: [],
}