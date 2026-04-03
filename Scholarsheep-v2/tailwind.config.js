import defaultTheme from 'tailwindcss/defaultTheme';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['courier new', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: 'rgb(13 148 136)',
        cyan: {
          600: '#0d9488',
        },
      },
    },
    screens: {
      sm: '486px',
      md: '547px',
      lg: '768px',
      xl: '1024px',
      '2xl': '1660px',
    },
    height: {
      76: '18rem',
      78: '19rem',
      82: '22rem',
      97: '28rem',
      98: '31rem',
      99: '38rem',
      100: '40rem',
      'fit-content': 'fit-content(20em)',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '50%': '50%',
      16: '4rem',
    },
  },
  plugins: [aspectRatio],
};
