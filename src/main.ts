import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import { createPinia } from 'pinia'
import i18n from './i18n/index'
import './assets/styles/main.scss'

createApp(App).use(createPinia()).use(router).use(i18n).mount('#app')
