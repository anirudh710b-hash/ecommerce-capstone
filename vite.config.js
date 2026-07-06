import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Pre-compresses build output (gzip) so hosts that serve
    // static .gz files automatically ship smaller payloads.
    compression({ algorithm: 'gzip', exclude: [/\.(br)$/, /\.(gz)$/] })
  ],
  build: {
    // Modern target keeps bundles small; Vite already minifies JS/CSS
    // with esbuild + lightningcss by default in production builds.
    target: 'es2018',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split vendor code from app code so the browser can cache
        // React/Router separately from your own code between deploys.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
