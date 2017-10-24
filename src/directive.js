import event from './event.js'
import { filterRegParams } from './utils.js'

/**
 *  registered directives in VUE for all verifies
 *  @param {Object} Vue
 *  @param {string} name
 *  @param {function} fn
*/

export default function directives (Vue, validator, fn, messages) {
 
  function dealRegs (regs) {
    if (!regs) {
      throw new function () {
        return `the directive v-verify value is undefined`
      }()
      return
    }
    return regs.split('|')
  }

  function dealValue (value, options) {
    const {el, regs, error, name} = options
    const _regs = dealRegs(regs)
    const _result = []
    if (!_regs) return
    for (let i = 0; i < _regs.length; i++) {
      const reg = _regs[i].trim()
      if (fn(reg, value)) {
        _result.push(true)
        continue
      }
      _result.push(false)
      break
    }
    return dealVerification(_result, _regs, options)
  }

  function dealVerification (_result, _regs, options) {
    const {el, error, name} = options
    const _bool = !_result[_result.length - 1]
    let _text = _bool ? getMessage(_regs[_result.length - 1].trim(), name) : ''
    if (!error) {
      tipsError(el, _text, !_bool)
      return  !_bool
    }
    errorDisplay(error, _bool)
    if (error.node) {
      (error.node !== _text) && (error.lastChild.replaceData(0, error.node.length, _text))
      error.node = _text
      return !_bool
    }
    error.node = document.createTextNode(_text)
    error.appendChild(error.node)
    addErrorClass(_bool, options)
    return !_bool    
  }

  function tipsError (el, _text, _bool) {
    if (el.instance && el.instance.message === _text) return
    if (el.instance && _text !== '') {
      el.instance.message = _text
      return
    }
    el.instance = Vue.vTips({
      el: el,
      remove: _bool,
      target: el.instance || null,
      message: _text
    })
  }

  function addErrorClass (type, options) {
    const { el, style } = options
    if (!style || (type && el.className.indexOf(style) !== -1)) return
    if (!type) {
      el.className = el.className.replace(style, '').replace(/\s+/gi, ' ')
      return
    }
    el.className += ` ${style}`
  }

  function errorDisplay (error, boolean) {
    if (!error) return
    error.style.display = boolean ? 'block' : 'none'
  }

  function getMessage (reg, value) {
    const _reg = filterRegParams(reg)
    const _msg = messages[_reg[0]]
    return _msg ? _msg(value, _reg[1]) : ''
  }

  function verifySubmit (options) {
    const { el, submit }= options
    if (!submit) return
    event.addEvent(submit, () => {
      return dealValue(el.value, options)
    }) 
  }

  function bindEvent (options) {
    const { el, events } = options
    events.forEach(item => {
      if (item === 'initial') {
        dealValue(el.value, options)
        return
      }
      el.addEventListener(item, (e) => {
        dealValue(e.target.value, options)
      })
    })
  }

  function generateParam (el, binding, type, param) {
    const data = type ? el.getAttribute(`data-verify-${param}`) : binding.value[param]

    if (param === 'dom') {
      if (!data) return null
      while (el.parentNode && !el.parentNode.querySelector(data)) {
        el = el.parentNode
      }
      return el.parentNode.querySelector(data) || null
    }
    return data ? data : null
  }

  Vue.directive('verify', {
    inserted: function (el, binding, vnode) {
      const _type = typeof binding.value === 'string'
      const _events = Object.keys(binding.modifiers)
      const options = {
        el: el.querySelector('input') || el.querySelector('input') || el.querySelector('textarea') || el,
        regs: _type ? binding.value : binding.value.regs,
        error:  generateParam(el, binding, _type, 'dom'),
        name: generateParam(el, binding, _type, 'name') || '',
        style: generateParam(el, binding, _type, 'style') || '',
        submit: generateParam(el, binding, _type, 'submit'),
        events: _events.length ? _events : ['change']
      }
      // 初始化隐藏 error 元素
      errorDisplay(options.error, false)
      verifySubmit(options)
      bindEvent(options)
    },
    unbind: function (el, binding) {
      const _type = typeof binding.value === 'string'
      const _submit = generateParam(el, binding, _type, 'submit')
      if (!_submit) return
      if (event.getListener(_submit)) {
        event.removeEvent(_submit)
      }
    }
  })
}
