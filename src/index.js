import validator from './validator/index.js'
import Directive from './directive.js'
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
    const directive = new Directive(Vue, {
      mode: options.mode,
      errorIcon: options.errorIcon,
      errorClass: options.errorClass || null,
      errorForm: options.errorForm,
      validators: validator,
      messages: lang[options.lang]
    })
    directive.install(Vue)
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
