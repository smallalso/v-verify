import Verify from '../src/verify.js'
import validators from '../src/validator/index.js'

const $ = new Verify(validators)

test('validate bootstrap test', () => {
  expect($.verify('date', '2018-09-24')).toBe(true)
})

test('event testing', () => {
  $.addEvent('test1', function () {
    return 1 + 1
  })
  $.addEvent('test1', function () {
    return 1 + 4
  })
  expect($.fireEvent('test1')).toEqual([2, 5])
  expect($.removeEvent('test1')).toEqual({})
})