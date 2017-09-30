import event from '../src/event.js'

test('event testing', () => {
  event.addEvent('test1', function () {
    return 1 + 1
  })
  event.addEvent('test1', function () {
    return 1 + 4
  })
  expect(event.fireEvent('test1')).toEqual([2, 5])
  expect(event.removeEvent('test1')).toEqual({})
})