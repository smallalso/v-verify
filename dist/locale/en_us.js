
export default {
  required: (filed) => `${filed} is required.`,
  numberic: (filed) => `${filed} only can contain numeric characters.`,
  email: (filed) => `${filed} is not a valid email.`,
  date: (filed, format) => `${filed} must be in the format: ${format || 'YYYY-MM-DD'}`,
  max: (filed, length) => `${filed} may not be greater than ${length}`,
  min: (filed, length) => `${filed} must be at least ${length}`,
  len: (filed, length) => `${filed} must be at ${length}`
}