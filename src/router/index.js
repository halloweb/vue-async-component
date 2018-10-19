import Vue from 'vue'
import Router from 'vue-router'
import pageRoot from '@/pages/pageRoot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page/:branch',
      name: 'pageRoot',
      component: pageRoot
    }
  ]
})
