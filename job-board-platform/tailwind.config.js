/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        secondary: '#64748b',
        background: '#f8fafc',
        accent: '#22c55e',
        neutral: '#1f2937',
      },
      fontSize: {
        'heading-xl': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-lg': ['20px', { lineHeight: '1.3', fontWeight: '700' }],
        subheading: ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
