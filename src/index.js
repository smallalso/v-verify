import validator from './validator.js'
import verifyFn from './generator.js'
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
    Vue.prototype.$verify = verifyFn(validators)
    directives(Vue, validators, Vue.prototype.$verify)
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
