import event from './event.js'
import { classOf, filterRegParams } from './utils.js'


function verifyValue (reg, value, params) {
  const _regType = classOf(reg)
  let _fn = null
  switch (_regType) {
    case 'regexp':
      _fn = (value) => {
        if (!reg.test(value)) {
          return false
        }
        return true
      }
      break
    case 'array':
      _fn = (value) => {
        let _bool = true
        for (let i = 0; i < reg.length; i++) {
          if (_typeof(reg[i]) === 'regexp') {
            _bool = reg[i].test(value)
          }
          if (!_bool) break
        }
        return _bool
      }
      break
    case 'function':
      _fn = (value) => {
        return params ? reg(value, params) : reg(value)
      }
      break
    default:
      _fn = (value) => {
        throw new function () {
          return 'type wrong in the config file'
        }()
      }
  }
  return _fn(value)
}

/**
 * generate verify function for all verifies
 * @param {Object} config 
 * @param {function} tips 
 */
export default function verifyFn (validators) {

  this.verify = function (validator, value) {
    const _validator = filterRegParams(validator)
    if (!validators[_validator[0]]) {
      throw new function () {
        return `the ${validator} is undefined`
      }()
      return
    }
    return _validator[1] ? verifyValue(validators[_validator[0]], value, _validator[1]) : verifyValue(validators[_validator[0]], value)
  }

  this.verifyAll = function (type) {
    return event.fireEvent(type)
  }
}