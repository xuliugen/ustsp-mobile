import {
  SET_REGISTER_USER_TYPE,
  SET_REGISTER_PHONE,
  SET_REGISTER_PASSWORD,
  SET_REGISTER_EMAIL,
  CLEAR_REGISTER
} from '../constants/actionTypes'

const initalState = {
  userType: null,
  phone: null,
  password: null,
  email: null
}

export default function register(state = initalState, action) {
  switch (action.type) {
    case SET_REGISTER_USER_TYPE:
      return {
        ...state,
        userType: action.userType
      }
    case SET_REGISTER_PHONE:
      return {
        ...state,
        phone: action.phone
      }
    case SET_REGISTER_PASSWORD:
      return {
        ...state,
        password: action.password
      }
    case SET_REGISTER_EMAIL:
      return {
        ...state,
        email: action.email
      }
    case CLEAR_REGISTER:
      return initalState
    default:
      return state
  }
}
