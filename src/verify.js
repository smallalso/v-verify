import event from './event.js'
import { classOf, filterRegParams, verifyValue } from './utils.js'
/**
 * generate verify function for all verifies
 * @param {Object} config 
 * @param {function} tips 
 */

function validate (validators) {

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

export default validate