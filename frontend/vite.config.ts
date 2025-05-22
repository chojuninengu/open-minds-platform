import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false, // Prevent auto-opening browser
    port: 5174, // Use consistent port
  },
  base: '/open-minds-platform/', // Add base URL for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
}) 