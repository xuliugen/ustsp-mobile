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

// 发送好友请求
export function sendAddFirend(ownerId, partyId) {
  return axios.post(`/message/add/friend?ownerId=${ownerId}&partyId=${partyId}`)
}
// 同意加好友
export function approveAddFirend(ownerId, partyId, msgId) {
  return axios.post(`/connection/add/friend?ownerId=${ownerId}&partyId=${partyId}&msgId=${msgId}`)
}
// 拒绝加好友
export function rejectAddFirend(ownerId, partyId, msgId) {
  return axios.post(`/message/reject/friend?ownerId=${ownerId}&partyId=${partyId}&msgId=${msgId}`)
}
