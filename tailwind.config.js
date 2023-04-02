module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        purple: 'rgb(132, 0, 152)',
        overlay: 'rgb(0,0,0,0.4)',
        gradient: ' linear-gradient(217deg, rgba(29, 0, 57, 0.8) 10%, rgba(4, 1, 14, 0.5) 60.71%, rgba(33, 6, 125, 0.5)), linear-gradient(127deg, rgba(39, 1, 114, 0.8) 20%, rgba(49, 0, 97, 0.5) 70.71%, rgba(115, 6, 125, 0.5)), linear-gradient(336deg, rgba(11, 1, 59, 0.8), rgba(8, 8, 173, 0.5) 70.71%, rgba(6, 34, 125, 0.5));'
      },
    },
  },
  plugins: [],
}
