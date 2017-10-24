import validator from './validator/index.js'
import validate from './verify.js'
import directives from './directive.js'

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
    Vue.validator = Vue.prototype.$validator = new validate(validators)
    directives(Vue, {
      mode: options.mode,
      icon: options.icon,
      errorClass: options.errorClass || null,
      verify: Vue.validator.verify,
      messages: messages
    })
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
