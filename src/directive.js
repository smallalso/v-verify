import event from './event.js'
import { messages } from './locale/zh_cn.js'
import { filterRegParams } from './utils.js'

/**
 *  registered directives in VUE for all verifies
 *  @param {Object} Vue
 *  @param {string} name
 *  @param {function} fn
*/

export default function directives (Vue, validator, fn) {

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
    const {regs, error, name} = options
    const _regs = dealRegs(regs)
    let _text = ''
    if (!_regs) return
    for (let i = 0; i < _regs.length; i++) {
      const reg = _regs[i].trim()
      if (fn(reg, value)) {
        _text = ''
        continue
      }
      _text = getMessage(reg, name)
      break
    }
    error.innerText = _text
    return _text === ''
  }

  function getMessage (reg, value) {
    const _reg = filterRegParams(reg)
    const _msg = messages[_reg[0]]
    return _msg ? _msg(value, _reg[1]) : ''
  }

  function dealSubmit (options) {
    const { el, regs, error, name, submit }= options
    if (!submit) return
    function submitValue (el, regs, error) {
      return function () {
        return dealValue(el.value, options)
      }
    }
    event.addEvent(submit, submitValue(el, regs, error)) 
  }

  function bindEvent (options) {
    const { el, regs, error, name, events } = options
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
      return data ? el.parentNode.querySelector(data) : null
    }
    return data ? data : null
  }

  Vue.directive('verify', {
    inserted: function (el, binding, vnode) {
      const _type = typeof binding.value === 'string'
      const _events = Object.keys(binding.modifiers)
      const options = {
        el: el,
        regs: _type ? binding.value : binding.value.regs,
        error:  generateParam(el, binding, _type, 'dom'),
        name: generateParam(el, binding, _type, 'name') || '',
        submit: generateParam(el, binding, _type, 'submit'),
        events: _events.length ? _events : ['change']
      }
      dealSubmit(options)
      bindEvent(options)
    },
    unbind: function (el, binding) {
      const _submit = generateParam(el, binding, _type, 'submit')
      if (!_submit) return
      if (event.getListener(_submit)) {
        event.removeEvent(_submit)
      }
    }
  })
}