import event from './event.js'
import { classOf, filterRegParams, verifyValue } from './utils.js'

class Validate {
  constructor (validators) {
    this.validators = validators
  }

  /**
 * generate verify function for all verifies
 * @param {validator} a validator
 * @param {value} a value need to validate
 */
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

  verifyAll (type) {
    return event.fireEvent(type)
  }
}

export default Validate