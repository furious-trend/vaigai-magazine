import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: ['**/vaigai/**', '**/node_modules/**', '**/dist/**', '**/*.pdf', '**/*.m4a', '**/*.mp3']
    }
  }
});
