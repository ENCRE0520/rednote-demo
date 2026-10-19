import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /* 产物用相对路径引资源：这样 dist 既能挂在任意子路径下，
     也能直接静态预览（内置预览面板 / 本地打开）而不依赖 dev server 常驻 */
  base: './',
})
