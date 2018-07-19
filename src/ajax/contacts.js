import axios from './request'

export function fetchFriendsList(id) {
  return axios.get('/connection/get/list', {
    params: {
      id: id
    }
  })
}

export function checkIsFriendApi(ownerId, partyId) {
  return axios.get(`/connection/check/friend`, {
    params: {
      ownerId: ownerId,
      partyId: partyId
    }
  })
}

// first 发起者 second 接受者
export function sendAddFirend(ownerId, partyId) {
  return axios.post(`/message/add/friend?ownerId=${ownerId}&partyId=${partyId}`)
}
