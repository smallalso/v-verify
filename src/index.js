import validator from './validator.js'
import generateFn from './generator.js'
import directives from './directive.js'

/**
 * VUE plugin registed function
 * @param {Object} Vue object 
 * @param {Object} plugin config object 
 */
function install (Vue, options) {
  const tips = options.tips || function (msg) { alert(msg) }
  const validators = Object.assign(validator, options.validators = {})

  const _keys = Object.keys(validators)

  Vue.prototype.$verify = {}
  try {
    _keys.forEach(name => {
      Vue.prototype.$verify[name] = generateFn(verifyObj[name], tips)
      directives(Vue, name, Vue.prototype.$verify[name])
    })
  } catch (e) {
    console.log(e)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
