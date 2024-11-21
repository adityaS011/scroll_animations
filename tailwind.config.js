module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include JS, JSX, TS, and TSX files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        'stabil-grotesk': ['"Stabil Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
