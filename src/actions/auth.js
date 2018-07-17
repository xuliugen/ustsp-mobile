import { login } from 'src/ajax/auth'
import { fetchTeacherInfo, fetchStudentInfo, fetchEnterpriseInfo } from 'src/ajax/talent'
import { LOGGED_IN, LOGGED_OUT, SET_USER_INFO } from '../constants/actionTypes'

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
      dispatch(getUserInfo())
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

export function getUserInfo() {
  return async (dispatch, getState) => {
    const { user } = getState().auth
    const { id, userType } = user
    try {
      let res
      switch (userType) {
        case 1:
          res = await fetchStudentInfo(id)
          const { studentInfoDTO } = res.data
          dispatch({
            type: SET_USER_INFO,
            userType: 1,
            userInfo: studentInfoDTO
          })
          break
        case 2:
          res = await fetchTeacherInfo(id)
          const { teacherInfoDTO } = res.data
          dispatch({
            type: SET_USER_INFO,
            userType: 2,
            userInfo: teacherInfoDTO
          })
          break
        case 3:
          res = await fetchEnterpriseInfo(id)
          dispatch({
            type: SET_USER_INFO,
            userType: 3,
            userInfo: res.data
          })
          break
      }
    } catch (error) {
      console.log(error)
    }
  }
}
