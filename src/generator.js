import { classBe } from './utils.js'

/**
 * generate verify function for all verifies
 * @param {Object} config 
 * @param {function} tips 
 */
export default function generateFn (config, tips) {
  const _regType = classBe(config.reg)
  let _fn = null
  switch (_regType) {
    case 'regexp':
      _fn = (data) => {
        const reg = config.reg
        if (!reg.test(data)) {
          return false
        }
        return true
      }
      break
    case 'array':
      _fn = (data) => {
        const reg = config.reg
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
        return config.reg(data)
      }
      break
    default:
      _fn = (data) => {
        throw new function () {
          return 'type wrong in the config file'
        }()
      }
  }
  return _fn
}