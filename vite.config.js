import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // <-- Просто добавь -swc

export default defineConfig({
    plugins: [react()],
})