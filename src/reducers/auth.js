import { LOGGED_IN, LOGGED_OUT, SET_USER_INFO } from '../constants/actionTypes'

const initialState = {
  token: null,
  user: {},
  userInfo: {}
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      const { token, user } = action
      return {
        ...state,
        token,
        user
      }
    case LOGGED_OUT:
      return initialState
    case SET_USER_INFO:
      const { userInfo } = action
      return {
        ...state,
        userInfo
      }
    default:
      return state
  }
}
