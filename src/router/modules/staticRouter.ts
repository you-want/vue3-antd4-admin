import type { RouteRecordRaw } from 'vue-router'
import CloudLayout from '@/layouts/CloudLayout.vue'
import { SettingOutlined } from '@ant-design/icons-vue'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/dev',
    name: 'dev',
    component: CloudLayout,
    redirect: '/dev/machine',
    meta: {
      icon: SettingOutlined,
      title: "开发",
    },
    children: [
      {
        path: "machine",
        name: "machine",
        meta: {
          title: "开发机",
        },
        component: () => import("@/views/dev/DevMachine.vue"),
      },
      {
        path: "volume",
        name: "volume",
        meta: {
          title: "存储卷",
        },
        component: () => import("@/views/dev/DevVolume.vue"),
      },
    ]
  },
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
  // {
  //   path: '/403',
  //   name: '403',
  //   component: () => import('@/components/ErrorMessage/FourThree.vue'),
  //   meta: {
  //     title: '403页面'
  //   }
  // },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/components/ErrorMessage/FourFour.vue'),
  //   meta: {
  //     title: '404页面'
  //   }
  // },
  // {
  //   path: '/500',
  //   name: '500',
  //   component: () => import('@/components/ErrorMessage/FiveHundred.vue'),
  //   meta: {
  //     title: '500页面'
  //   }
  // },
  // // 解决刷新页面，路由警告
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/components/ErrorMessage/FourFour.vue')
  // }
]
