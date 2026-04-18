import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend.test',
        changeOrigin: true,
        headers: { Accept: 'application/json' }
      },
      '/sanctum': {
        target: 'http://backend.test',
        changeOrigin: true,
        headers: { Accept: 'application/json' }
      },
      '/login': {
        target: 'http://backend.test',
        changeOrigin: true,
        headers: { Accept: 'application/json' }
      },
      '/register': {
        target: 'http://backend.test',
        changeOrigin: true,
        headers: { Accept: 'application/json' }
      },
      '/logout': {
        target: 'http://backend.test',
        changeOrigin: true,
        headers: { Accept: 'application/json' }
      }
    }
  }
})
