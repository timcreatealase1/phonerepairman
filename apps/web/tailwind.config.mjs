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
        // Off-white "paper" — warmer than pure white, used as the dominant page bg
        // so brand blue sections create rhythm instead of competing for attention.
        paper: '#fafaf7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      // Fluid display sizes for editorial hero typography.
      fontSize: {
        'display-1': ['clamp(2.5rem, 6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(1.75rem, 4vw, 3rem)',  { lineHeight: '1.08', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        prose: '65ch',
        container: '1180px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.06)',
        'card-hover': '0 6px 24px rgba(0,0,0,0.08)',
      },
    },
  },
};
