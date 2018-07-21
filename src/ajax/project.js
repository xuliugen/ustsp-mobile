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

function searchProjects(req) {
  return axios.post('/search/project/detail', req)
}

// 甲方获取已发布项目
function getPublishedDemand(userId, page, rows, status) {
  const params = { userId, page, rows }
  return axios.get(`/project/query/status`, {
    params: (status ? { ...params, status } : params)
  })
}

// 乙方获取已报名项目
function getUndertakenDemand(userId, page, rows, status) {
  const params = { userId, page, rows }
  return axios.get(`/project/query/applicated`, {
    params: (status ? { ...params, status } : params)
  })
}

export {
  fetchHomeScreenProjects,
  fetchProjectDetailApi,
  searchProjects,
  getPublishedDemand,
  getUndertakenDemand
}
