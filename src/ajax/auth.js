import axios from './request'

export function login(req) {
  return axios.post('/user/login', req)
}
