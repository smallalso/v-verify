import validator from './validator.js'
import generateFn from './generator.js'
import directives from './directive.js'

/**
 * VUE plugin registed function
 * @param {Object} Vue object 
 * @param {Object} plugin config object 
 */
function install (Vue, options = {}) {
  const tips = options.tips || function (msg) { alert(msg) }
  const validators = Object.assign(validator, options.validators = {})

  const _keys = Object.keys(validators)
  console.log(_keys)
  Vue.prototype.$verify = {}
  try {
    _keys.forEach(name => {
      Vue.prototype.$verify[name] = generateFn(validators[name], tips)
      directives(Vue, name, Vue.prototype.$verify[name])
    })
  } catch (e) {
    console.error(`${e}\nfrom vv-alidate`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
