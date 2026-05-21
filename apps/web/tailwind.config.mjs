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
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          900: '#111827',
        },
        surface: {
          alt: '#f3f4f6',
          tint: '#e8f1fc',
        },
        // "Paper" — warm off-white, dominant page bg (brand sheet --paper).
        paper: '#fafaf7',
        // Hairline rules — warm grey, used for section dividers and card borders.
        line: '#e5e3dc',
        'line-strong': '#cfccc1',
      },
      fontFamily: {
        sans: ['Inter', '"Helvetica Neue"', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      // Brand sheet caps h1 at 64px / h2 at 36px. Fluid via clamp().
      fontSize: {
        'display-1': ['clamp(2.625rem, 5vw, 4rem)',       { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-2': ['clamp(1.75rem, 3.5vw, 2.25rem)',   { lineHeight: '1.15', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        prose: '65ch',
        container: '1240px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 6px 24px rgba(0,0,0,0.06)',
      },
    },
  },
};
