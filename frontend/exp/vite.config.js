import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    // proxy: {
    //   '/api/v1/users': "https://spend-ex-1.onrender.com",
    //   '/api/v1/incomes': "https://spend-ex-1.onrender.com",
    //   '/api/v1/expenses': "https://spend-ex-1.onrender.com"
    // }
  },

  plugins: [react()],
})
