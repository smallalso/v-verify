import Vue from 'vue'
import router from './router.js'
import vVerify from 'v-verify'
import App from './App.vue'
import Vuep from 'vuep'
import Compt from './components'
import 'vuep/dist/vuep.css'

import 'muse-components/styles/base.less'
import contentBlock from 'muse-components/contentBlock'
import {row, col} from 'muse-components/grid'
import {list, listItem} from 'muse-components/list'
import drawer from 'muse-components/drawer'
import appBar from 'muse-components/appBar'
import iconButton from 'muse-components/iconButton'

Vue.component(row.name, row)
Vue.component(col.name, col)
Vue.component(list.name, list)
Vue.component(listItem.name, listItem)
Vue.component(drawer.name, drawer)
Vue.component(appBar.name, appBar)
Vue.component(iconButton.name, iconButton)
Vue.component(contentBlock.name, contentBlock)

Vue.use(Compt)
Vue.use(vVerify, {
  mode: 'insert',
  errorClass: 'example-error',
  errorForm: 'example-form-error',
  errorIcon: 'icon-warn iconfont',
  validators: { // 自定义验证器
    zing: (value) => {
      return /^[a-zA-Z0-9_-]+@zing\.com$/.test(value)
    }
  },
  messages: { // 验证器消息提示
    zing: (name) => `${name}必须以@zing.com结尾`
  }
})
Vue.use(Vuep)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})