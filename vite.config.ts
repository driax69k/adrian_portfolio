import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: 'animation-vendor',
              test: /node_modules[\\/](?:@gsap[\\/]react|gsap)[\\/]/,
              priority: 25,
            },
            {
              name: 'icons-vendor',
              test: /node_modules[\\/](?:@lobehub|lucide-react|react-icons)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 10,
              maxSize: 250_000,
            },
          ],
        },
      },
    },
  },
});
