import axios from './request'

function fetchHomeTalents() {
  return axios.get('/user')
}

function searchTalents(req) {
  return axios.post('/search/user/detail', req)
}

export {
  fetchHomeTalents,
  searchTalents
}
