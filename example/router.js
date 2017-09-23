import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const install = System.import('@/pages/install.md')
const basic = System.import('@/pages/basic.md')
const submit = System.import('@/pages/submit.md')
export default new Router({
  base: '/',
  routes: [
    {
      path: '',
      component: t => install
    },
    {
      path: '/install',
      name: 'install',
      component: t => install
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