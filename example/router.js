import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const install = System.import('@/pages/install.md')
const usage = System.import('@/pages/usage.md')
const basic = System.import('@/pages/basic.md')
const submit = System.import('@/pages/submit.md')
const introduction = System.import('@/pages/introduction.md')

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
      path: '/usage',
      name: 'usage',
      component: t => usage
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: t => introduction
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