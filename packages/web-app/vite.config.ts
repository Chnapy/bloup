import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const config = defineConfig({
  cacheDir: 'node_modules/.cache/.vite',
  plugins: [react()],
});

export default config;
