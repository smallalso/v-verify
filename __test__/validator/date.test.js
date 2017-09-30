import date from '../../src/validator/date.js'

const valid = [{
  value: '2017-09-24',
  format: 'YYYY-MM-DD'
}, {
  value: '24/09/2017',
  format: 'DD/MM/YYYY'
}]

test('verify date format', () => {
  valid.forEach(item => expect(date(item.value, item.format)).toBe(true))
})