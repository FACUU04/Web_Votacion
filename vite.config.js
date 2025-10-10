import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Web_Votacion/", // 👈 Esta línea es la clave
  plugins: [react()],
})
