import axios from './request'

export function fetchFriendsList(id) {
  return axios.get('/connection/get/list', {
    params: {
      id: id
    }
  })
}
