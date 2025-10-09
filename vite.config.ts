import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables" as *;`,
      },
    },
  },
  server: {
    proxy: {
      '/quiz-api': {
        target: 'https://edu.pinkcode.school',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/quiz-api/, '/api/v1/quizzes'),
      },
    },
  },
})