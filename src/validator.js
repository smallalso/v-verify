/**
 * Here is a validator like date|phone|emial
 */

// required validator
const required = {
  reg: function (value) {
    if (value === undefined || value === null || value === '') {
      return false;
    }
  
    return !! String(value).trim().length;
  },
  msg: '必填选项，请填写'
}

// date validator
const date = {
  reg: /^[1|2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/,
  msg: '您填写的日期格式不正确'
}

export default {
  required,
  date
}
