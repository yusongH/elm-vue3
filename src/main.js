import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

const app = createApp(App)

// 路由
app.use(router)
// veux
app.use(store)

// 挂载
app.mount('#app')
