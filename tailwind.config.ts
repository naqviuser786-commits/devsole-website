import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- 1. DEVSOLE Studio High-End Palette (Public Site) ---
        studio: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16',
        },
        // Signature Authority Accent (Electric Cobalt / Indigo)
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          deep: '#1d4ed8',
          subtle: '#eff6ff',
          border: '#bfdbfe',
        },
        // Verified Status Accents (Used strictly for live telemetry)
        live: {
          emerald: '#10b981',
          emeraldBg: '#ecfdf5',
          emeraldBorder: '#a7f3d0',
          amber: '#f59e0b',
          amberBg: '#fffbeb',
          rose: '#f43f5e',
          roseBg: '#fff1f2',
        },

        // --- 2. CRM & Admin Portal Preserved Colors (DO NOT REMOVE) ---
        navy: {
          800: '#111827',
          900: '#0b1120',
          950: '#040711',
        },
        chrome: {
          100: '#f8fafc',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        },
        energy: {
          DEFAULT: '#0284c7',
          bright: '#00f0ff',
          soft: '#38bdf8',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // Luxury Subtle Studio Shadows (No cheap blurry glow)
        subtle: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        elevated: '0 10px 30px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        floating: '0 20px 45px -10px rgba(15, 23, 42, 0.1), 0 8px 16px -4px rgba(15, 23, 42, 0.04)',
        // CRM Specific Glows
        glow: '0 0 20px rgba(0, 240, 255, 0.35)',
        'glow-lg': '0 0 35px rgba(0, 240, 255, 0.5)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px), linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px)',
        'studio-mesh':
          'radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.06) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(16, 185, 129, 0.05) 0px, transparent 50%)',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} satisfies Config;