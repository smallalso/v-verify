import { formatDate, parse } from '../utils.js'

export default (value, format = 'YYYY-MM-DD') => {
  const _value = parse(value, format, new Date())
  if (value !== formatDate(_value, format)) {
    return false
  }
  return true
}