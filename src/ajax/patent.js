import axios from './request'

export function searchPatents(req) {
  return axios.post('/search/patent/detail', req)
}

export function fetchPatentDetailApi(patentId, currentUserId = '') {
  return axios.get('/patent/query/enquiry', {
    params: {
      patentId,
      currentUserId
    }
  })
}
