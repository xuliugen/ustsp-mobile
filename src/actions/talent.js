import { fetchTeacherInfo, fetchStudentInfo, fetchEnterpriseInfo } from 'src/ajax/auth'
import { SET_TALENT_INFO, CLEAR_TALENT_INFO } from '../constants/actionTypes'

export function getTalentInfo(id, userType) {
  return async (dispatch, getState) => {
    try {
      let res
      switch (userType) {
        case 1:
          res = await fetchStudentInfo(id)
          const { userInfoDTO, studentInfoDTO } = res.data
          dispatch({
            type: SET_TALENT_INFO,
            userType: 1,
            talent: userInfoDTO,
            talentInfo: studentInfoDTO
          })
          break
        case 2:
          res = await fetchTeacherInfo(id)
          const { userInfoDTO: tuser, teacherInfoDTO } = res.data
          dispatch({
            type: SET_TALENT_INFO,
            userType: 2,
            talent: tuser,
            talentInfo: teacherInfoDTO
          })
          break
        case 3:
          res = await fetchEnterpriseInfo(id)
          dispatch({
            type: SET_TALENT_INFO,
            userType: 3,
            talentInfo: res.data
          })
          break
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearTalentInfo() {
  return {
    type: CLEAR_TALENT_INFO
  }
}
