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

// 甲方发项目
function pubishDemand(body) {
  return axios.post('/project/publish', body)
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

// 乙方项目报名
function signUpInfo(body) {
  return axios.post('/project/docking', body)
}

// 甲方获取项目的报名人
function getDemandApplicants(userId, projectId) {
  return axios.get(`/project/query/applicants?userId=${userId}&projectId=${projectId}`)
}

// 变更项目状态
function changeDemandStatus(body) {
  return axios.post(`project/status`, body)
}

// 获取项目详情
function getDemanOrderDetail(projectId) {
  return axios.get(`/project/query/project-detail?projectId=${projectId}`)
}

// 提交评价
function submitEvaluation(body) {
  return axios.post(`project/evaluate`, body)
}

export {
  fetchHomeScreenProjects,
  fetchProjectDetailApi,
  searchProjects,
  pubishDemand,
  getPublishedDemand,
  getUndertakenDemand,
  signUpInfo,
  getDemandApplicants,
  changeDemandStatus,
  getDemanOrderDetail,
  submitEvaluation
}
