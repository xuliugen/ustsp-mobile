import { LOGGED_IN, LOGGED_OUT } from '../constants/actionTypes'

const initialState = {
  token: null,
  user: {}
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
    default:
      return state
  }
}
