/**
 * Here is a validator like date|phone|emial
 */

// date validator
const date = {
  reg: /^[1|2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/,
  msg: 'sorry, the date format is incorrect'
}

export default {
  date
}
