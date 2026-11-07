import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: [
        '**/vaigai/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/docs/**',
        '**/.git/**',
        '**/*.docx',
        '**/*.pdf',
        '**/*.m4a',
        '**/*.mp3',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.webp'
      ]
    }
  }
});
