import axios from './request'

export function fetchHomeTalents() {
  return axios.get('/user')
}

export function searchTalents(req) {
  return axios.post('/search/user/detail', req)
}

export function fetchTeacherInfo(id) {
  return axios.get('/teacher/getInfo', {
    params: { id }
  })
}

export function fetchOtherTeacherInfo(id) {
  return axios.get(`/teacher/getOtherAddInfo`, {
    params: { id }
  })
}

export function fetchStudentInfo(id) {
  return axios.get(`/student/getInfo`, {
    params: { id }
  })
}

export function fetchStudentOtherInfo(id) {
  return axios.get('/student/getOtherAddInfo', {
    params: { id }
  })
}

export function fetchEnterpriseInfo(id) {
  return axios.get(`/enterprise/getInfo`, {
    params: { id }
  })
}
