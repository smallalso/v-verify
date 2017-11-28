import { parse, format as formatDate } from 'date-fns'

/**
 * javscript data type judgment
 * @param {*} obj 
 */
function classOf (obj) {
  const class2type = {}
  'Boolean Number String Function Array Date RegExp Object tips'.split(' ')
  .forEach((e, i) => {
    class2type['[object ' + e + ']'] = e.toLowerCase()
  })
  if (obj == null) {
    return String(obj)
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[ class2type.toString.call(obj) ] || 'object'
    : typeof obj
}

function filterRegParams (reg) {
  if (reg.indexOf(':') === -1) return [reg]
  const _reg = reg.split(':').map(item => item.trim())
  return [_reg.shift(), _reg]
}

function splitRegs (regs) {
  if (!regs) {
    throw new function () {
      return `the directive v-verify value is undefined`
    }()
    return
  }
  return regs.split('|')
}

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

function compareParams (origin, compare) {
  if (!origin) return
  let _compare = true
  if (!typeof origin === 'object') {
    Object.keys(origin).forEach(item => {
      if (origin[item] !== compare[item]) {
        _compare = false
        return
      }
    })
  } else {
    _compare = origin === compare
  }
  return _compare
}

export {
  classOf,
  filterRegParams,
  splitRegs,
  parse,
  verifyValue,
  formatDate,
  compareParams
}