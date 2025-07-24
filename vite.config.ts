// vite.config.ts
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
    // increase my chunk size in vercel (1500Kb)
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/pages/dashboard')) {
            return 'dashboard';
          }
          if (id.includes('src/pages/auth')) {
            return 'auth';
          }
        },
      },
    },
  },
  server : {
    host : "192.168.22.117"
  }
});
