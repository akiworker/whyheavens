import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  base: '/whyheavens/',
  publicDir: 'static',
  build: {
    outDir: 'dist'
  },
  server: {
    allowedHosts: true
  }
})
