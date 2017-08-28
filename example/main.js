import Vue from 'vue'
import router from './router.js'
import vValidate from 'vv-alidate'

Vue.use(vValidate)

new Vue({
  el: '#app',
  router
})