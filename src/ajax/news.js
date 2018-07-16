import axios from './request'

export function fetchNewsDetail(id) {
  return axios.get('/dynamics/query/one', {
    params: {
      dynamicsId: id
    }
  })
}
