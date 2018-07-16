import axios from './request'

export function searchTalents(req) {
  return axios.post('/search/user/detail', req)
}

export function searchProjects(req) {
  return axios.post('/search/project/detail', req)
}