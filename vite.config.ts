import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    // Not 'assets': that path was once served with a one-year immutable cache
    // even for 404 responses, so some browsers hold broken copies of its URLs.
    assetsDir: 'static',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['gsap', 'lenis'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
});