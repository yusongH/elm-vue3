import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const app = createApp(App)

// 路由
app.use(router)

// 挂载
app.mount('#app')
