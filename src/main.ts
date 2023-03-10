/*
 * @description: 
 * @author: lijingru
 * @Date: 2023-03-01 10:40:07
 * @lastEditors: lijingru
 * @LastEditTime: 2023-03-02 16:30:12
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

const app = createApp(App).use(router).mount('#app')

