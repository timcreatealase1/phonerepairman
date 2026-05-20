/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8f1fc',
          100: '#d1e2f9',
          200: '#a3c5f3',
          300: '#76a8ed',
          400: '#488be7',
          500: '#0057b8',
          600: '#004ea5',
          700: '#004492',
          800: '#003a7f',
          900: '#003d82',
          ink: '#001f4d',
        },
        ink: {
          DEFAULT: '#111827',
          muted: '#4b5563',
          light: '#6b7280',
        },
        surface: {
          DEFAULT: '#ffffff',
          alt: '#f3f4f6',
          tint: '#e8f1fc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        prose: '65ch',
        container: '1100px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.06)',
        'card-hover': '0 6px 20px rgba(0,0,0,0.09)',
      },
    },
  },
};
