const messages = {
  required: (filed) => `${filed}不能为空`,
  numberic: (filed) => `${filed}不能包含非数字字符`,
  email: (filed) => `${filed}不符合指定邮箱格式`,
  date: (filed) => `${filed}不符合指定日期格式`,
  max: (filed, length) => `${filed}超过最大长度${length}`,
  min: (filed, length) => `${filed}小于最小长度${length}`
}

export{
  messages
}


