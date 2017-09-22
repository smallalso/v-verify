import event from './event.js'

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

  function dealValue (value, regs, _error) {
    const _regs = dealRegs(regs)
    let _text = ''
    if (!_regs) return
    for (let i = 0; i < _regs.length; i++) {
      const reg = _regs[i].trim()
      if (fn(reg, value)) {
        _text = ''
        continue
      }
      _text = validator[reg] ? validator[reg].msg : ''
      break
    }
    _error.innerText = _text
    return _text === ''
  }

  function dealSubmit (el, binding, _error) {
    const _submit = el.getAttribute('data-verify-submit')
    if (!_submit) return
    function submitValue (el, binding, _error) {
      return function () {
        return dealValue(el.value, binding.value, _error)
      }
    }
    event.addEvent(_submit, submitValue(el, binding, _error)) 
  }

  function bindEvent (el, _events, value, _error) {
    _events.forEach(item => {
      if (item === 'initial') {
        dealValue(el.value, value, _error)
        return
      }
      el.addEventListener(item, (e) => {
        dealValue(e.target.value, value, _error)
      })
    })
  }

  Vue.directive('verify', {
    inserted: function (el, binding, vnode) {
      const _events = Object.keys(binding.modifiers).length ? Object.keys(binding.modifiers) : ['change']
      const _dom = el.getAttribute('data-verify-dom')
      const _error = _dom ? el.parentNode.querySelector(_dom) : null
      dealSubmit(el, binding, _error)
      bindEvent(el, _events, binding.value, _error)
    },
    unbind: function (el) {
      const _submit = el.getAttribute('data-verify-submit')
      if (!_submit) return
      if (event.getListener(_submit)) {
        event.removeEvent(_submit)
      }
    }
  })
}