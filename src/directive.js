import Verify from './verify.js'
import errorRender from './error.js'
import vTips from './vtips/index.js'
import { filterRegParams, splitRegs, compareParams } from './utils.js'

/**
 *  registered directives in VUE for all verifies
 *  @param {Object} Vue
 *  @param {Object} config
*/

export default class Directive extends Verify {
  constructor (Vue, config) {
    super(config.validators)
    Vue.validator = Vue.prototype.$validator =  this
    this.config = config
    this.disError = errorRender(Vue, config)
    this.tipError = vTips(Vue, config)
  }

  verifyRegs (value, options) {
    const {el, regs, name} = options
    const _regs = splitRegs(regs)
    const _result = []
    if (!_regs) return
    for (let i = 0; i < _regs.length; i++) {
      const reg = _regs[i].trim()
      if (this.verify(reg, value)) {
        _result.push(true)
        continue
      }
      _result.push(false)
      break
    }
    return this.dealVerifyResult(_result, _regs, options)
  }

  dealVerifyResult (_result, _regs, options) {
    const _bool = !_result[_result.length - 1]
    const {bind, el, name} = options
    const _mode = options.mode || config.mode || 'insert'
    let _text = _bool ? this.getMessage(_regs[_result.length - 1].trim(), name) : ''

    if (_mode === 'insert') {
      this.insertError(bind, _text, !_bool)
    } else if (_mode === 'tip') {
      this.tipsError(el, _text, !_bool)
    }
    this.dealFormClass(_bool, options)
    return !_bool    
  }

  insertError (el, _text, _bool) {
    if (el.instance && el.instance.message === _text) return
    if (el.instance && _text !== '') {
      el.instance.message = _text
      return
    }
    el.instance = this.disError({
      el: el,
      target: el.instance || null,
      message: _text
    })
  }

  tipsError (el, _text, _bool) {
    if (el.instance && el.instance.message === _text) return
    if (el.instance && _text !== '') {
      el.instance.message = _text
      return
    }
    el.instance = this.tipError({
      el: el,
      remove: _bool,
      target: el.instance || null,
      message: _text
    })
  }

  dealFormClass (type, options) {
    const { el, style } = options
    if (!style || (type && el.className.indexOf(style) !== -1)) return
    if (!type) {
      el.className = el.className.replace(style, '').replace(/\s+/gi, ' ')
      return
    }
    el.className += ` ${style}`
  }

  getMessage (reg, value) {
    const _reg = filterRegParams(reg)
    const _msg = this.config.messages[_reg[0]]

    return _msg ? _msg(value, _reg[1]) : ''
  }

  bindSubmit (options) {
    const { el, submit } = options
    if (!submit) return
    const self = this
    this.addEvent(submit, () => {
      return self.verifyEvent(options)
    }) 
  }

  verifyEvent (options) {
    const { el } = options
    const _setValue = el.dataset.verifyVal
    let _value = el.value
    if (_setValue !== 'null' && _setValue !== 'undefined' && _setValue) {
      _value = _setValue
    }
    return this.verifyRegs(_value, options)
  }

  bindEvent (options) {
    const { el, events } = options
    events.forEach(item => {
      if (item === 'initial') {
        return this.verifyEvent(options)
      }
      if (!this.isForm(el)) return
      el.addEventListener(item, (e) => {
        return this.verifyEvent(options)
      })
    })
  }

  isForm (el) {
    if (!el) return
    let isForm = false
    const Form = ['input', 'textarea']
    if (Form.indexOf(el.tagName.toLowerCase()) > -1) {
      isForm = true
    }
    for (let i = 0; i < Form.length; i++) {
      if (el.querySelector(Form[i])) {
        isForm = true
        break
      }
    }
    return isForm
  }

  setVerifyVal (el, val) {
    el.setAttribute('data-verify-val', val)
  }

  initVerify (el, binding, vnode ) {
    const options = this.createOptions(el, binding)
    if (!this.isForm(el)) {
      this.setVerifyVal(el, vnode.data.props.value)
    }

    this.bindSubmit(options)
    this.bindEvent(options)
    return options
  }

  createOptions (el, binding) {
    const _type = typeof binding.value === 'string'
    const _events = Object.keys(binding.modifiers)

    function generateParam (param) {
      const data = _type ? el.getAttribute(`data-verify-${param}`) : binding.value[param]
      return data ? data : null
    }

    return {
      bind: el,
      el: el.querySelector('input') || el.querySelector('textarea') || el,
      regs: _type ? binding.value : binding.value.regs,
      name: generateParam('name') || '',
      style: generateParam('style') || this.config.errorForm || '',
      mode: generateParam('mode') || this.config.mode || null,
      submit: generateParam('submit'),
      events: _events.length ? _events : ['change']
    }

  }

  install (Vue) {
    const self = this
    Vue.directive('verify', {
      inserted: function (el, binding, vnode) {
        self.initVerify(el, binding, vnode)
      },
      // only verify VUE components that with directives of v-model
      update: function (el, binding, vnode, oldVnode) {
        // watch params change
        let options = null
        if (!compareParams(binding.value, binding.oldValue)) {
          options = self.initVerify(el, binding, vnode)
        }

        // verify v-model
        if (self.isForm(el) || vnode.data.props.value === oldVnode.data.props.value) return
        options = options || self.createOptions(el, binding)
        self.setVerifyVal(el, vnode.data.props.value)
        self.verifyEvent(options)
      },
      unbind: function (el, binding) {
        const _type = typeof binding.value === 'string'
        const _submit = el.getAttribute(`data-verify-submit`) || binding.value.submit
        if (!_submit) return
        if (self.listener[_submit]) {
          self.removeEvent(_submit)
        }
      }
    })
  }
}