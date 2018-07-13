import {
  fetchTeacherInfo,
  fetchOtherTeacherInfo,
  fetchStudentInfo,
  fetchStudentOtherInfo,
  fetchEnterpriseInfo
} from 'src/ajax/talent'
import { SET_TALENT_INFO, CLEAR_TALENT_INFO } from '../constants/actionTypes'

export function getTalentInfo(id, userType) {
  return async (dispatch, getState) => {
    try {
      switch (userType) {
        case 1:
          const [stdInfo, stdOtherInfo] = await Promise.all([fetchStudentInfo(id), fetchStudentOtherInfo(id)])
          const { userInfoDTO, studentInfoDTO } = stdInfo.data
          dispatch({
            type: SET_TALENT_INFO,
            userType: 1,
            talent: userInfoDTO,
            talentInfo: {
              ...studentInfoDTO,
              edu: stdOtherInfo.data
            }
          })
          break
        case 2:
          const [tchInfo, tchOtherInfo] = await Promise.all([fetchTeacherInfo(id), fetchOtherTeacherInfo(id)])
          const { userInfoDTO: tuser, teacherInfoDTO } = tchInfo.data
          dispatch({
            type: SET_TALENT_INFO,
            userType: 2,
            talent: tuser,
            talentInfo: Object.assign({}, teacherInfoDTO, tchOtherInfo.data)
          })
          break
        case 3:
          const etpInfo = await fetchEnterpriseInfo(id)
          dispatch({
            type: SET_TALENT_INFO,
            userType: 3,
            talentInfo: etpInfo.data
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
