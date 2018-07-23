import axios from './request'

// queryType 1系统消息，11好友消息，21项目消息， 31专利消息，41团队，51站内信'
export function fetchMessages(userId, queryType, page, rows) {
  const queryTypes = ['system', 'friend', 'demand', 'ip', 'team', 'post']
  queryType = queryTypes.indexOf(queryType) * 10 + 1
  return axios.get('/message/query/messages', {
    params: {
      userId,
      queryType,
      page,
      rows
    }
  })
}

// 设置消息已读
export function fetchOneMessage(msgId) {
  return axios.get('/message/query/one', {
    params: {
      msgId
    }
  })
}
