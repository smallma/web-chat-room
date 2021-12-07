import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

export default defineConfig({
  resolve: {
    alias: {
      '@': _resolve('src'),
      '@assets': _resolve('src/assets'),
      '@comps': _resolve('src/components'),
      '@utils': _resolve('src/utils'),
      '@router': _resolve('src/router'),
      '@store': _resolve('src/store'),
    }
  },
  define: {
    'process.env': {
      VUE_APP_WS_URL: 'ws://localhost:8001'
    }
  },
  plugins: [vue()]
})