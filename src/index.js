import validator from './validator/index.js'
import Validate from './verify.js'
import directives from './directive.js'
import lang from './locale'

/**
 * VUE plugin registed function
 * @param {Object} Vue object 
 * @param {Object} plugin config object 
 */

function install (Vue, options = {}) {
  options.lang = options.lang || 'zh_cn'
  Object.assign(validator, options.validators)
  Object.assign(lang[options.lang], options.messages)
  try {
    Vue.validator = Vue.prototype.$validator = new Validate(validator)
    directives(Vue, {
      mode: options.mode,
      errorIcon: options.errorIcon,
      errorClass: options.errorClass || null,
      errorForm: options.errorForm,
      messages: lang[options.lang]
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
