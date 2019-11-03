import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

// 适用于手机端UI组件

import Util from '@/init/util'

import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import LayoutView from '@/components/LayoutView'

Vue.use(VueRouter)
Vue.use(ViewUI)

const routers = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/hi',
    name: 'Hi',
    component: Hi,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/layout',
    name: 'LayoutView',
    component: LayoutView,
    props: (route) => ({ query: route.query.q })
  }
]

// 路由配置
const RouterConfig = {
  mode: 'history',
  // base: '/', 默认base为域名根目录下
  routes: routers
}

// console.log(process.env)
if (process.env.NODE_ENV === 'production') RouterConfig.base = window.location.pathname
// 参考: [Have the router behave relative to URL the root app is mounted from] https://github.com/vuejs/vue-router/issues/1497]
// 参考: [Vue-router route in development mode only] https://forum.vuejs.org/t/vue-router-route-in-development-mode-only/7634/2

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  Util.title(to.meta.title)
  next()
})

router.afterEach((to, from, next) => {
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
