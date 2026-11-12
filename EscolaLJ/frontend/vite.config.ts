import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// O "proxy" faz o frontend repassar chamadas /api para o backend (porta 8000).
// Assim o React chama "/api/health" sem precisar saber o endereço do backend.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
