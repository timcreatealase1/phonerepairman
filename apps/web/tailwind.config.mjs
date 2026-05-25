/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand blue is the actual hex pulled from the PR Logo 2026 wordmark.
        // Scale derived from #0b70ff with consistent darken steps for hover /
        // deep / surface backgrounds.
        brand: {
          50:  '#e8f0ff',
          100: '#d0e0ff',
          200: '#a3c2ff',
          300: '#6e9eff',
          400: '#3a83ff',
          500: '#0b70ff',
          600: '#0058d4',
          700: '#0046a8',
          800: '#003b8a',
          900: '#003270',
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
          tint: '#e8f0ff',
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
        // Brand display face — opt-in via `font-blackout`. Loaded only when used.
        blackout: ['"Blackout Midnight"', '"Arial Black"', 'Impact', 'sans-serif'],
      },
      fontSize: {
        // display-1 — hero scale. Fluid 44px (mobile) → 104px (xl desktop).
        // Tracks the "big preview" feel from the font sample, scaled for
        // real-world hero contexts (not the 144px poster size).
        'display-1': ['clamp(2.75rem, 9vw, 6.5rem)',      { lineHeight: '1.0',  letterSpacing: '-0.03em'  }],
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
