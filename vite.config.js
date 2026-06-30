import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': { 
        target: 'http://54.225.232.55:8081',
        changeOrigin: true
      },
      '/api/v0': { target: 'http://52.203.106.39:8086',
        changeOrigin: true
      }
    }
  }
})
