import moment from 'moment'

export function parseProjectName(name) {
  if (name.length > 15) {
    name = name.substr(0, 15) + '...'
  }
  return name
}

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
  return (time && typeof time === 'number') ? moment(time).format(format) : ''
}
// num to str
export function parseUserType(type) {
  switch (type) {
    case 1:
      return '学生'
    case 2:
      return '教师'
    case 3:
      return '企业'
    case 4:
      return '科研管理员'
    default:
      return ''
  }
}
