import type { RouteRecordRaw } from 'vue-router'
import CloudLayout from '@/components/layouts/CloudLayout.vue'
import { HomeOutlined } from '@ant-design/icons-vue'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'about',
    component: CloudLayout,
    redirect: '/about',
    meta: {
      icon: HomeOutlined,
      title: '关于',
      isHideChildren: true,
      parent: 'about'
    },
    children: [
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于',
          parent: 'about'
        },
        component: () => import('@/views/about/AboutView.vue')
      }
    ]
  }
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/FourThree.vue'),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/FourFour.vue'),
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/FiveHundred.vue'),
    meta: {
      title: '500页面'
    }
  },
  // 解决刷新页面，路由警告
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/ErrorMessage/FourFour.vue')
  }
]
