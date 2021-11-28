import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/main/Index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/main/children/home/Index.vue')
      },
      {
        path: 'food',
        name: 'food',
        component: () => import('@/views/main/children/home/children/Food.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/main/children/Search.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/main/children/Order.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/main/children/My.vue')
      }
    ]
  },
  {
    path: '/city-list',
    name: 'cityList',
    component: () => import('@/views/CityList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/city/:id',
    name: 'city',
    component: () => import('@/views/City.vue')
  },
  {
    // vue-router@4的变化，舍弃*通配符
    // 官方文档：https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history: createWebHashHistory(),
  routes
})

export default router
