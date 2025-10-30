import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import svgLoader from 'vite-svg-loader';


export default defineConfig({
  plugins: [vue(),
  svgLoader()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/styles/variables" as *;
        @use "@/assets/styles/mixins" as *;
      `,
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