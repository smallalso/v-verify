import Vue from 'vue'
import router from './router.js'
import vVerify from 'v-verify'
import App from './App.vue'
Vue.use(vVerify)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})