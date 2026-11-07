import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative paths work at a domain root and under a GitHub Pages /repo/ path.
  base: './',
  plugins: [react()],
})
