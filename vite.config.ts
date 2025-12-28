import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/WargameBandits/', // GitHub Pages 배포 시 리포지토리 이름

  define: {
    'process.env': {},
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://wargame-server.vercel.app', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});