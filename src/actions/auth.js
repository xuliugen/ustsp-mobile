import { login } from 'src/ajax/auth'
import { LOGGED_IN, LOGGED_OUT } from '../constants/actionTypes'

export function dispatchAuthData(token, user) {
  return {
    type: LOGGED_IN,
    token,
    user
  }
}

export function userLogin(req) {
  return async (dispatch) => {
    try {
      const { data } = await login(req)
      dispatch({
        type: LOGGED_IN,
        token: data.token,
        user: data.user
      })
      return data
    } catch (error) {
      throw error
    }
  }
}

export function userLogout() {
  return {
    type: LOGGED_OUT
  }
}
