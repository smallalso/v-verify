import * as utils from '../src/utils.js'

test('judgment the class of javascript', () => {
  expect(utils.classOf(123)).toBe('number')
  expect(utils.classOf(/^[\dA-Z]/)).toBe('regexp')
  expect(utils.classOf([1, 2, 3])).toBe('array')
})

test('get params from attribute', () => {
  expect(utils.filterRegParams('len')).toEqual(['len'])
  expect(utils.filterRegParams('date: DD/MM/YYYY')).toEqual(['date', ['DD/MM/YYYY']])
  expect(utils.filterRegParams('max: 5 : 4')).toEqual(['max', ['5', '4']])
})

test('test verifyValue', () => {
  expect(utils.verifyValue(/^[0-9]+$/, 53456)).toBe(true)
})