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
  }

  Vue.directive('verify', {
    inserted: function (el, binding, vnode) {
      const _event = binding.modifiers['input'] ? 'input' : 'change'
      const _dom = el.getAttribute('data-verify-dom')
      const _error = el.parentNode.querySelector(_dom)

      el.addEventListener( _event, (e) => {
        dealValue(e.target.value, binding.value, _error)
      })
    }
  })
}