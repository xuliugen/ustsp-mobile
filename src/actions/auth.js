import { login } from 'src/ajax/auth'
import { LOGGED_IN } from '../constants/actionTypes'

export async function userLogin(req) {
  const { data } = await login(req)
  return {
    type: LOGGED_IN,
    token: data.token,
    user: data.user
  }
}
