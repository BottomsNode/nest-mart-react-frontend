import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group node_modules into 'vendor'
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          const match = id.match(/src\/pages\/([^/]+)/);
          if (match) {
            return `page-${match[1]}`; // 'page-dashboard', 'page-auth'
          }

          const featureMatch = id.match(/src\/features\/([^/]+)/);
          if (featureMatch) {
            return `feature-${featureMatch[1]}`; //'feature-cart', 'feature-user'
          }
        },
      },
    },
  },
});
