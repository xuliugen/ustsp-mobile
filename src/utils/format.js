import moment from 'moment'

export function parseMoney(number) {
  if (number < 1000) {
    return number
  } else {
    let k = number / 1000
    let isFloat = k % 1 !== 0
    if (isFloat) {
      k = k.toFixed(1)
    }
    return `${k}k`
  }
}

export function parseTime(time, format = 'YYYY-MM-DD') {
  return moment(time).format(format)
}
// num to str
export function parseUserType(type) {
  switch(type) {
    case 1:
      return '学生'
      break
    case 2:
      return '教师'
      break
    case 3:
      return '企业'
      break
    case 4:
      return '科研管理员'
      break
    default:
      return ''
  }
}
