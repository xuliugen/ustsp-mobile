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
function getPublishedDemand(userId, page, row, status) {
  if (status === undefined) {
    return axios.get(`/project/query/status`, {
      params: {
        userId: userId,
        page: page,
        rows: row
      }
    })
  }
  return axios.get(`/project/query/status`, {
    params: {
      userId: userId,
      status: status,
      page: page,
      rows: row
    }
  })
}

// 乙方获取已报名项目
function getUndertakenDemand(userId, page, row, status) {
  if (status === undefined) {
    return axios.get(`/project/query/applicated`, {
      params: {
        userId: userId,
        page: page,
        rows: row
      }
    })
  }
  return axios.get(`/project/query/applicated`, {
    params: {
      userId: userId,
      status: status,
      page: page,
      rows: row
    }
  })
}

export {
  fetchHomeScreenProjects,
  fetchProjectDetailApi,
  searchProjects,
  getPublishedDemand,
  getUndertakenDemand
}
