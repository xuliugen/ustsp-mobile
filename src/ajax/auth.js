import axios from './request'

export function login(req) {
  return axios.post('/user/login', req)
}
// 用户名是否存在
export function checkUsernameExist(phone) {
  return axios.get(`/user/getUser`, {
    params: { phone }
  })
}
// 邮箱是否存在
export function checkEmailExist(mail) {
  return axios.get(`/user/getUser`, {
    params: { mail }
  })
}
// 发送手机验证码
export function sendPhoneCode(phone) {
  return axios.get(`/user/code/phone`, {
    params: { phone }
  })
}
// 校验输入的手机验证码是否正确
export function checkVerifyCode(code, phone) {
  return axios.post(`/user/code/check`, {
    code: code,
    phone: phone,
    flag: 1
  })
}
// 注册
export function register(body) {
  return axios.post('/user/register', body)
}
// 从小程序认领教师数据
export function claimTchInfo(email) {
  return axios.get(`https://weixin.uppfind.com/university-assistant-server/teacher/fetch?email=${email}&type=1`)
}
// 教师确认认领
export function confirmClaimTch(userId, email) {
  return axios.post(`/teacher/valid-claim?userId=${userId}&email=${email}`)
}
