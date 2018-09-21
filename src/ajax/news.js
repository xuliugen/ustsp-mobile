import axios from './request'

export function fetchNewsDetailApi(id) {
  return axios.get('/dynamics/query/one', {
    params: {
      dynamicsId: id
    }
  })
}

export function searchNews(req) {
  return axios.post('/search/dynamics/detail', req)
}

export function publishNews(req) {
  return axios.post('/dynamics/publish', req)
}
