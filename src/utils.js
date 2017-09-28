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
  const _reg = reg.split(':')
  return [_reg.splice(0, 1), _reg]
}

export {
  classOf,
  filterRegParams,
  parse,
  formatDate
}