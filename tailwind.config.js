/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        georama: ['Georama', 'sans-serif'],
        roboto: ['Roboto Mono', 'monospace'],
      },
      screens: {
        '3xl': '1920px',
      },
      spacing: {
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
      },
      width: {
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        'md': '28rem',
      },
      maxWidth: {
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
      },
    },
  },
  plugins: [],
}