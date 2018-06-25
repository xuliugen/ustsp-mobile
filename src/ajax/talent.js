import axios from './request'

function fetchHomeTalents() {
  return axios.get('/user')
}

export {
  fetchHomeTalents
}
