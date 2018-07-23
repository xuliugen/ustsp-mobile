import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { px2dp, px2sp } from 'src/utils/device'
import { parseTime } from 'src/utils/format'
import { THEME_COLOR } from 'src/styles/common'
import { fetchOneMessage } from 'src/ajax/msg'

@withNavigation
export default class InternalMsgItem extends React.Component {
  handleReadPress = async () => {
    const { msg } = this.props
    if (msg.status === 2) {
      await fetchOneMessage(msg.id)
      this.props.refreshList()
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
              <Text style={styles.text} >您收到一条站内信</Text>
              <Text style={styles.time} >{parseTime(msg.createTime, 'YYYY-MM-DD HH:mm')}</Text>
            </View>
            <Text style={styles.bottomLine} >{msg.senderName}&nbsp;&nbsp;&nbsp;&nbsp;<Text style={msg.status === 1 && styles.readAlready}>给您发来一条站内信</Text></Text>
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
  text: {
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
    color: THEME_COLOR
  },
  readAlready: {
    color: '#999'
  }
})
