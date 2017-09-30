
const listener = {}

function addEvent (type, fn) {
  if (!type || !fn || typeof type !== 'string' || typeof fn !== 'function') {
    throw new Error('传入的参数不符合要求！')
    return
  }

  if (typeof listener[type] === 'undefined') {
    listener[type] = []
  }

  listener[type].push(fn)
  return listener
}

function fireEvent (type) {
  const _target = listener[type]
  const result = []
  if (!type || !_target || !_target.length) {
    throw new Error('无该类型事件')
    return
  }
  _target.forEach(item => {
    if (typeof item !== 'function') return
    result.push(item({ type: type }))
  })
  return result
}

function removeEvent (type, fn) {
  const _target = listener[type]
  if (!type || !_target || !_target.length) {
    throw new Error('无该类型事件')
    return
  }
  if (typeof fn === 'function') {
    for (let i = 0; i < _target.length; i++) {
      if (_target[i] !== fn) { continue }
      listener[type].splice(i, 1)
      break
    }
  } else {
    delete listener[type]
  }
  return listener
}

function getListener (type) {
  return listener[type]
}

export default {
  addEvent,
  fireEvent,
  removeEvent,
  getListener
} 
