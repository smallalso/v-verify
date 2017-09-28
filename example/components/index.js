// import Input from './input'
import Layout from './layout'

const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.component(Layout.name, Layout)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Layout
}