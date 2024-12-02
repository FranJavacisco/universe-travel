import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/universe-travel/',  // Nombre de tu repositorio
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})