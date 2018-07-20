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

export function projectStatusNum2Str(status) {
  switch (status) {
    case 0:
      return '待审核'
    case 1:
      return '报名中'
    case 2:
      return '待签单'
    case 3:
      return '进行中'
    case 4:
      return '待验收'
    case 5:
      return '评价'
    case 6:
      return '完成'
    case 13:
      return '甲方中断'
    case 14:
      return '乙方中断'
    default:
      return ''
  }
}
