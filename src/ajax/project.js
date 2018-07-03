import axios from './request'

function fetchHomeScreenProjects(showNum = 5) {
  return axios.get('project/query/home-page/projects', {
    params: { showNum: showNum }
  })
}

function fetchProjectDetailApi(projectId, userId = '') {
  return axios.get('project/query/application-detail', {
    params: {
      projectId,
      userId
    }
  })
}

export {
  fetchHomeScreenProjects,
  fetchProjectDetailApi
}
