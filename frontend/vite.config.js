import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Ensures proper path handling in production
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Still useful for local dev
    },
  },
})
