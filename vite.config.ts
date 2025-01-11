import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
      manifest: {
        name: 'Phoenix Boating',
        short_name: 'Phoenix',
        description: 'Phoenix Boating Application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/',
    },
    proxy: {
      '/api': {
        target: 'https://appsail-50024466061.development.catalystappsail.in', // Replace with your backend URL
        changeOrigin: true,
        secure: true, // Use true if your backend uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove `/api` prefix if not needed
      },
    },
  },
});
