import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,   // запускаем на 5173-м порту
    open: true    // автоматически открывает в браузере
  },
  define: {
    __APP_NAME__: JSON.stringify("My React App") // можно использовать в коде
  }
})
