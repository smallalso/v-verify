import { filterRegParams, verifyValue } from './utils.js'
class Verify {
  constructor (validators) {
    this.listener = {}
    this.validators = validators
  }
  
  addEvent (type, fn) {
    if (!type || !fn || typeof type !== 'string' || typeof fn !== 'function') {
      throw new Error('传入的参数不符合要求！')
      return
    }
  
    if (typeof this.listener[type] === 'undefined') {
      this.listener[type] = []
    }
  
    this.listener[type].push(fn)
    return this
  }
  
  fireEvent (type) {
    const _target = this.listener[type]
    const result = []
    if (!type || !_target || !_target.length) {
      throw new Error('无该类型事件')
      return
    }
    _target.forEach(item => {
      if (typeof item !== 'function') return
      result.push(item({ type: type }))
    })
    return result
  }
  
  removeEvent (type, fn) {
    const _target = this.listener[type]
    if (!type || !_target || !_target.length) {
      throw new Error('无该类型事件')
      return
    }
    if (typeof fn === 'function') {
      for (let i = 0; i < _target.length; i++) {
        if (_target[i] !== fn) { continue }
        this.listener[type].splice(i, 1)
        break
      }
    } else {
      delete this.listener[type]
    }
    return this.listener
  }

  verifyAll (type) {
    return this.fireEvent(type)
  }

  verify (validator, value) {
    const _validator = filterRegParams(validator)
    if (!this.validators[_validator[0]]) {
      throw new function () {
        return `the ${validator} is undefined`
      }()
      return
    }
    return _validator[1] ? 
           verifyValue(this.validators[_validator[0]], value, _validator[1]) :
           verifyValue(this.validators[_validator[0]], value)
  }
}

export default Verify