import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { px2dp, px2sp } from 'src/utils/device'
import { parseTime, setMsgDetail } from 'src/utils/format'
import { THEME_COLOR } from 'src/styles/common'
import { fetchOneMessage } from 'src/ajax/message'

@withNavigation
export default class SystemMsgItem extends React.Component {
  handleReadPress = () => {
    const { msg } = this.props
    if (msg.status === 2) fetchOneMessage(msg.id)
    switch (msg.messageType) {
      case 1: case 2:
        this.props.navigation.navigate('ProjectDetail', {
          projectId: msg.relateId
        })
        break
      case 3: case 4:
        this.props.navigation.navigate('PatentDetail', {
          patentId: msg.relateId
        })
        break
      default:
        break
    }
  }

  render() {
    const { msg } = this.props
    return (
      <TouchableOpacity onPress={this.handleReadPress}>
        <View style={styles.container} >
          <Image source={{ uri: msg.senderAvatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View style={styles.topLine} >
              <Text style={styles.sender} >UppFind管理员</Text>
              <Text style={styles.time} >{parseTime(msg.createTime, 'YYYY-MM-DD HH:mm')}</Text>
            </View>
            <Text style={[styles.bottomLine, msg.status === 2 && styles.unread]} >{msg.messageContent}{setMsgDetail(msg.messageType)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(30),
    backgroundColor: '#fff'
  },
  avatar: {
    marginRight: px2dp(30),
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(100 / 2)
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sender: {
    fontSize: px2sp(28),
    color: '#333'
  },
  time: {
    fontSize: px2sp(28),
    color: '#999'
  },
  bottomLine: {
    marginTop: px2dp(20),
    fontSize: px2sp(28),
    color: '#999'
  },
  unread: {
    color: THEME_COLOR
  }
})
