import { classOf } from './utils.js'


function verifyValue (reg, value) {
  const _regType = classOf(reg)
  let _fn = null
  switch (_regType) {
    case 'regexp':
      _fn = (data) => {
        if (!reg.test(data)) {
          return false
        }
        return true
      }
      break
    case 'array':
      _fn = (data) => {
        let _bool = true
        for (let i = 0; i < reg.length; i++) {
          if (_typeof(reg[i]) === 'regexp') {
            _bool = reg[i].test(data)
          }
          if (!_bool) break
        }
        return _bool
      }
      break
    case 'function':
      _fn = (data) => {
        return reg(data)
      }
      break
    default:
      _fn = (data) => {
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
  return function (validator, value) {
    console.log(validator, value, 234)
    const _config = validators[validator]
    if (!_config || !_config.reg) {
      throw new function () {
        return `the ${validator} is undefined`
      }()
      return
    } 
    return verifyValue(_config.reg, value)
  }
}