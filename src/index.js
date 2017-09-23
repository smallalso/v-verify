import validator from './validator/'
import verify from './verify.js'
import directives from './directive.js'

/**
 * VUE plugin registed function
 * @param {Object} Vue object 
 * @param {Object} plugin config object 
 */

function install (Vue, options = {}) {
  const tips = options.tips || function (msg) { alert(msg) }
  const validators = Object.assign(validator, options.validators = {})
  try {
    Vue.prototype.$validator = new verify(validators)
    directives(Vue, validators, Vue.prototype.$validator.verify)
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
