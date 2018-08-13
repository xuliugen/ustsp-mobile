import {
  SET_REGISTER_USER_TYPE,
  SET_REGISTER_PHONE,
  SET_REGISTER_PASSWORD,
  SET_REGISTER_EMAIL,
  SET_REGISTER_CLAIM_DATA,
  SET_REGISTER_USER_ID,
  CLEAR_REGISTER
} from '../constants/actionTypes'

export function setRegisterUserType(userType) {
  return {
    type: SET_REGISTER_USER_TYPE,
    userType
  }
}

export function setRegisterPhone(phone) {
  return {
    type: SET_REGISTER_PHONE,
    phone
  }
}

export function setRegisterPassword(password) {
  return {
    type: SET_REGISTER_PASSWORD,
    password
  }
}

export function setRegisterEmail(email) {
  return {
    type: SET_REGISTER_EMAIL,
    email
  }
}

export function setRegisterClaimData(claimData) {
  return {
    type: SET_REGISTER_CLAIM_DATA,
    claimData
  }
}

export function setRegisterUserId(userId) {
  return {
    type: SET_REGISTER_USER_ID,
    userId
  }
}

export function clearRegister() {
  return {
    type: CLEAR_REGISTER
  }
}
