import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Vercel 배포는 루트 경로 사용, GitHub Pages는 /WargameBandits/
  base: process.env.VERCEL ? '/' : (mode === 'production' ? '/WargameBandits/' : '/'),

  define: {
    'process.env': {},
  },

  server: {
    proxy: {
      '/api': {
        // TEMPORARY: 프로덕션 API 사용 (로컬 API 서버 없이 개발)
        // TODO: vercel dev로 로컬 API 실행 시 localhost:3001로 변경
        target: 'https://wargame-server.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));