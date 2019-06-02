import Vue from 'vue'
import VueRouter from 'vue-router'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

// 适用于手机端UI组件
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import Util from '@/init/util'

import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Picker from '@/components/Picker'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(Mint)

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
    path: '/mint',
    name: 'Picker',
    component: Picker
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
  iView.LoadingBar.start()
  Util.title(to.meta.title)
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
