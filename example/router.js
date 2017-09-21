import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const test = System.import('@/pages/test.md')
const test1 = System.import('@/pages/example.md')

export default new Router({
  base: '/',
  routes: [
    {
      path: '',
      name: 'example',
      component: t => test1
    },
    {
      path: '/test',
      name: 'example',
      component: t => test1
    }
  ]
})