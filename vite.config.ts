import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@nodes': path.resolve(__dirname, './src/components/nodes'),
      '@slices': path.resolve(__dirname, './src/slices'),
      '@actions': path.resolve(__dirname, './src/actions'),
      '@store': path.resolve(__dirname, './src/store'),
      '@config': path.resolve(__dirname, './src/config'),
      '@triggers': path.resolve(__dirname, './src/triggers'),
    },
  },
});