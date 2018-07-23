import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
// https://github.com/dancormier/react-native-swipeout
import Swipeout from 'react-native-swipeout'

import { px2dp, px2sp } from 'src/utils/device'
import { THEME_COLOR } from 'src/styles/common'
import { parseUserType } from 'src/utils/format'
import { approveAddFirend, rejectAddFirend } from 'src/ajax/contacts'

import MessageBar from 'src/components/common/MessageBar'

export default class FriendRequestItem extends React.Component {
  handleApproveBtnPress = async () => {
    const { receiverId, senderId, id } = this.props.msg
    await approveAddFirend(receiverId, senderId, id)
    MessageBar.show({
      message: '添加成功'
    })
    this.props.refreshList()
  }

  handleRejectBtnPress = async () => {
    const { receiverId, senderId, id } = this.props.msg
    await rejectAddFirend(receiverId, senderId, id)
    MessageBar.show({
      message: '已拒绝'
    })
    this.props.refreshList()
  }

  _renderBtn() {
    let text
    switch (this.props.msg.status) {
      case 1: case 2:
        text = '通过'
        break
      case 3:
        text = '已同意'
        break
      case 4:
        text = '已拒绝'
        break
      default:
        text = ''
    }
    return (
      <TouchableOpacity
        onPress={this.handleApproveBtnPress}
        style={this.props.msg.status !== 2 ? [styles.btn, styles.approvedBtn] : [styles.btn, styles.approveBtn]}>
        <Text style={styles.approveText}>{text}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { msg } = this.props
    // status 1已读 2未读 3同意 4拒绝
    const swipeoutBtns = msg.status === 2 ? [
      {
        text: '不通过',
        backgroundColor: '#fa2024',
        color: '#fff',
        onPress: this.handleRejectBtnPress
      }
    ] : null
    return (
      <Swipeout autoClose right={swipeoutBtns}>
        <View style={styles.itemContainer}>
          <View>
            <Image source={{ uri: msg.senderAvatar }} style={styles.avatar} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoTop}>
              <Text style={styles.name}>{msg.senderName}</Text>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{parseUserType(msg.senderType)}</Text>
              </View>
              {/* <Image source={require('src/img/certificate.png')} style={styles.certificate} /> */}
            </View>
            <View style={styles.applyInfoContainer}>
              <Text style={styles.applyInfo}>请求加您为好友</Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            {this._renderBtn()}
          </View>
        </View>
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(20),
    backgroundColor: '#fff'
  },
  avatar: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(100 / 2)
  },
  infoContainer: {
    justifyContent: 'center',
    paddingLeft: px2dp(30)
  },
  infoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: px2dp(10)
    marginBottom: px2dp(16)
  },
  name: {
    marginRight: px2dp(15),
    fontSize: px2sp(28),
    color: '#333'
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: px2dp(18),
    marginRight: px2dp(12),
    borderRadius: px2dp(30 / 8),
    backgroundColor: '#eee'
  },
  title: {
    fontSize: px2dp(22),
    color: '#8f9ba7'
  },
  certificate: {
    height: px2dp(28),
    width: px2dp(30)
  },
  applyInfoContainer: {
    // marginTop: px2dp(20)
  },
  applyInfo: {
    fontSize: px2sp(28),
    color: '#999'
  },

  btnContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  btn: {
    height: px2dp(60),
    width: px2dp(120),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px2dp(10)
  },
  approveBtn: {
    backgroundColor: THEME_COLOR
  },
  approvedBtn: {
    backgroundColor: '#aaa'
  },
  approveText: {
    fontSize: px2sp(28),
    color: '#fff'
  }
})
