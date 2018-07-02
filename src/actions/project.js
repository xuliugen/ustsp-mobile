import { fetchProjectDetailApi } from '../ajax/project'
import { SET_PROJECT_DETAIL, CLEAR_PROJECT_DETAIL } from '../constants/actionTypes'

export function fetchProjectDetail(projectId) {
  return async dispatch => {
    try {
      const { data } = await fetchProjectDetailApi(projectId)
      const { projectInfoVo, ...baseData } = data
      const projectData = Object.assign({}, baseData, projectInfoVo.projectResearchInfo, {
        skills: projectInfoVo.projectSkillList || []
      })
      dispatch({
        type: SET_PROJECT_DETAIL,
        project: projectData
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearProjectDetail() {
  return {
    type: CLEAR_PROJECT_DETAIL
  }
}
