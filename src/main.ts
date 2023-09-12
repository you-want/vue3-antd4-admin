import './assets/css/main.css'

import { createApp, type App } from 'vue'
import pinia from '@/stores'

import app from './App.vue'
import router from './router'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import 'virtual:uno.css'

let MicroApp: App

function render(props: any = {}) {
  const { container } = props
  MicroApp = createApp(app)

  MicroApp.use(pinia)
  MicroApp.use(router)

  const c = container ? container.querySelector('#app') : '#app'

  MicroApp.mount(c)
}

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
} else {
  // 作为子应用运行
  console.info('vue3sub run')
  renderWithQiankun({
    mount(props) {
      console.info('vue3sub mount', props)
      render(props)
    },
    bootstrap() {
      console.info('vue3sub bootstrap')
    },
    unmount(props) {
      console.info('vue3sub unmount', props)
      MicroApp.unmount()
    },
    update(props) {
      console.info('vue3sub update', props)
    }
  })
}
