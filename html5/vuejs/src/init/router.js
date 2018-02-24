import Vue from 'vue'
import VueRouter from 'vue-router'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Util from '@/init/util'

import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'

Vue.use(iView)
Vue.use(VueRouter)

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
  }
]

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers
}

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
