import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const test = System.import('@/pages/test.md')
const basic = System.import('@/pages/basic.md')
const submit = System.import('@/pages/submit.md')
export default new Router({
  base: '/',
  routes: [
    {
      path: '',
      component: t => test
    },
    {
      path: '/start',
      name: 'start',
      component: t => test
    },
    {
      path: '/basic',
      name: 'basic',
      component: t => basic
    },
    {
      path: '/submit',
      name: 'submit',
      component: t => submit
    }
  ]
})