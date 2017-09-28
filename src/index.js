import validator from './validator/index.js'
import verify from './verify.js'
import directives from './directive.js'
import vTips from './vtips/index.js'

/**
 * VUE plugin registed function
 * @param {Object} Vue object 
 * @param {Object} plugin config object 
 */

function install (Vue, options = {}) {
  options.lang = options.lang || 'zh_cn'
  const validators = Object.assign(validator, options.validators = {})
  const messages = Object.assign(require('./locale/' + options.lang),  options.messages = {})
  try {
    Vue.validator = Vue.prototype.$validator = new verify(validators)
    Vue.vTips = Vue.prototype.$vTips = options.vtips || vTips(Vue, options)
    directives(Vue, validators, Vue.prototype.$validator.verify, messages)
  } catch (e) {
    console.error(`${e}\nfrom v-verify`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
