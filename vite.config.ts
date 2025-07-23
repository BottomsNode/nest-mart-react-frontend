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
          // All third-party libraries go into vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Pages: src/pages/dashboard -> chunk-page-dashboard
          const pageMatch = id.match(/\/src\/pages\/([^\/]+)/);
          if (pageMatch) {
            return `chunk-page-${pageMatch[1]}`;
          }

          // Features: src/features/user -> chunk-feature-user
          const featureMatch = id.match(/\/src\/features\/([^\/]+)/);
          if (featureMatch) {
            return `chunk-feature-${featureMatch[1]}`;
          }

          // Shared chunks (optional): e.g. src/components, src/utils, etc.
          const sharedMatch = id.match(/\/src\/(components|utils|hooks|lib)\//);
          if (sharedMatch) {
            return `chunk-${sharedMatch[1]}`;
          }

          // fallback default chunk name (optional)
          return null;
        }
      },
    },
  },
});
