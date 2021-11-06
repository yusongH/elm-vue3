import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'
// vant
import initVant from '@/plugins/vant'

// 实例化vue
const app = createApp(App)

// 路由
app.use(router)
// veux
app.use(store)
// vant
initVant(app)

// 挂载
app.mount('#app')
