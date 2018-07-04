import { SET_PATENT_DETAIL, CLEAR_PATENT_DETAIL } from '../constants/actionTypes'
import { fetchPatentDetailApi } from 'src/ajax/patent'

export function fetchPatentDetail(patentId) {
  return async dispatch => {
    try {
      const { data } = await fetchPatentDetailApi(patentId)
      const { patent, assignor, surrenderee } = data
      const assignorData = {
        username: assignor.username,
        ...assignor.userInfo
      }
      const surrendereeData = (surrenderee && surrenderee.userInfo) ? {
        username: surrenderee.username,
        ...surrenderee.userInfo
      } : {}

      const patentData = Object.assign({}, patent, {
        assignor: assignorData
      }, {
        surrenderee: surrendereeData
      })
      dispatch({
        type: SET_PATENT_DETAIL,
        patent: patentData
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearPatentDetail() {
  return {
    type: CLEAR_PATENT_DETAIL
  }
}
