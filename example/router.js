import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const test = System.import('@/pages/test.md')
const test1 = System.import('@/pages/test1.md')

export default new Router({
  base: '/',
  routes: [
    {
      path: '',
      name: 'index',
      component: t => test
    },
    {
      path: '/test',
      name: 'test',
      component: t => test1
    }
  ]
})