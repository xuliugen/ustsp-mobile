import axios from './request'

// queryType 1系统消息，11好友消息，21项目消息， 31专利消息，41团队，51站内信'
export function fetchMsgByType(userId, queryType, page, rows) {
  return axios.get('/message/query/messages', {
    params: {
      userId,
      queryType,
      page,
      rows
    }
  })
}
