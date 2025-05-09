import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss'), // Adds Tailwind as PostCSS plugin
        require('autoprefixer') // Add autoprefixer for better CSS compatibility
      ],
    },
  },
});