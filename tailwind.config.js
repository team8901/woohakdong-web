/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        regular: 'Pretendard-Regular',
        semiBold: 'Pretendard-SemiBold',
      },
      textColor: {
        primary: 'var(--color-primary)',
        black: 'var(--color-black)',
        gray: 'var(--color-gray)',
        darkGray: 'var(--color-darkGray)',
        lightGray: 'var(--color-lightGray)',
      },
      borderColor: {
        primary: 'var(--color-primary)',
        lightGray: 'var(--color-lightGray)',
      },
      backgroundColor: {
        primary: 'var(--color-primary)',
        lightPrimary: 'var(--color-lightPrimary)',
        lightGray: 'var(--color-lightGray)',
      },
    },
  },
  plugins: [scrollbarHide],
};
