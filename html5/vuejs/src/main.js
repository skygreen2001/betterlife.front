// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import Config from '@/config'
import Util from '@/init/util'
import router from '@/init/router'
import App from './App'

Vue.config.debug = true
Vue.config.devtools = true
Vue.config.productionTip = false

Vue.prototype.$config = Config
Vue.prototype.$utils = Util

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// Axios 中文说明: https://www.kancloud.cn/yunye/axios/234845
axios.defaults.baseURL = Config.URL.base
