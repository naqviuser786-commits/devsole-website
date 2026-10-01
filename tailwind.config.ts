import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#03050a',
          900: '#05070f',
          800: '#0a0e1a',
          700: '#101627',
        },
        chrome: {
          100: '#f4f6fb',
          300: '#c7cede',
          500: '#8b93a7',
          700: '#4a5164',
          900: '#1c1f2b',
        },
        energy: {
          DEFAULT: '#2b6bff',
          soft: '#5b8bff',
          bright: '#7fd0ff',
          dim: '#123a8f',
        },
      },
      fontFamily: {
        display: ['"Sora"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(43, 107, 255, 0.35)',
        'glow-lg': '0 0 90px rgba(43, 107, 255, 0.45)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(43,107,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(43,107,255,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
