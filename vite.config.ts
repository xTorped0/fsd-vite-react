import { defineConfig } from 'vite';
//
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import environment from 'vite-plugin-environment'
//
import path from 'path';

export default defineConfig({
	server: {
		port: 8080,
	},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/shared/ui-kit'),
      '@store': path.resolve(__dirname, './src/app/store/index.ts'),
      '@api': path.resolve(__dirname, './src/app/api'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@assets': path.resolve(__dirname, './src/shared/assets'),
      '@vars': path.resolve(__dirname, './src/shared/styles/vars.scss'),
    },
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    react(),
    environment('all', { prefix: 'REACT_APP_' }),
  ],
})