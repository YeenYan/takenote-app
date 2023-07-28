import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  publicPath: '/',
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Corrected the resolve path
    },
  },
  server: {
    proxy: {
      // Configure the proxy for your API server
      '/api': {
        target: 'https://firestore.googleapis.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Updated the pathRewrite to rewrite method
      },
    },
  },
});
