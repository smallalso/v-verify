import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '',
      name: 'phone',
      component: r => System.import('@/pages/Phone.vue')
    }
  ]
})