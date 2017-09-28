export default (value, [len]) => {
  len = Number(len)
  if (value === undefined || value === null) {
    return false
  }
  if (typeof value === 'number') {
    value = String(value)
  }
  return value.length === len
}