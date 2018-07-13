import axios from './request'

export function login(req) {
  return axios.post('/user/login', req)
}

export function fetchTeacherInfo(id) {
  return axios.get('/teacher/getInfo', {
    params: { id }
  })
}

export function fetchStudentInfo(id) {
  return axios.get(`/student/getInfo`, {
    params: { id }
  })
}

export function fetchEnterpriseInfo(id) {
  return axios.get(`/enterprise/getInfo`, {
    params: { id }
  })
}

export function fetchOtherTeacherInfo(id) {
  return axios.get(`/teacher/getOtherAddInfo`, {
    params: { id }
  })
}
