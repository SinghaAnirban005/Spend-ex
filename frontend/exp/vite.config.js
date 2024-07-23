import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1/users': "http://localhost:8000",
      '/api/v1/incomes': "http://localhost:8000",
      '/api/v1/expenses': "http://localhost:8000"
    }
  },

  plugins: [react()],
})
