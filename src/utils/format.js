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
