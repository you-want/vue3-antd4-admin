import { createRouter, createWebHistory } from 'vue-router'

import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

import HomeView from '../views/HomeView.vue'

const {
  pkg: { name },
} = __APP_INFO__

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // 
  history: createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? `/${name}` : "/"
  ),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
