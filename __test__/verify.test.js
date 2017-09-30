import validate from '../src/verify.js'
import validators from '../src/validator/index.js'

test('validate bootstrap test', () => {
  const _validate = new validate(validators)
  expect(_validate.verify('date', '2018-09-24')).toBe(true)
})