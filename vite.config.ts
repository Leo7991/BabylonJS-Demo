/*
 * @description: 
 * @author: lijingru
 * @Date: 2023-03-01 10:40:07
 * @lastEditors: lijingru
 * @LastEditTime: 2023-03-02 16:04:14
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [vue()],
})
