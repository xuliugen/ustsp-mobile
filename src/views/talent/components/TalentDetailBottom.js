import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { MaterialIcons } from '@expo/vector-icons'

import MessageBar from 'src/components/common/MessageBar'
import { checkIsFriendApi, sendAddFirend } from 'src/ajax/contacts'

export default class TalentDetailBottom extends React.Component {
  state = {
    isFriend: false
  }

  componentDidMount() {
    this.checkIsFriend()
  }

  async checkIsFriend() {
    if (!this.props.isLogin) {
      return
    }
    try {
      const { data } = await checkIsFriendApi(this.props.userId, this.props.id)
      if (data > 0) {
        this.setState({
          isFriend: true
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async handleAddPress(userId, partyId) {
    if (!this.props.isLogin) {
      MessageBar.show({
        type: 'warning',
        message: '请先登录再进行操作'
      })
    } else if (!this.props.isCompleted) {
      MessageBar.show({
        type: 'warning',
        message: '请先在个人中心完善用户信息'
      })
    } else {
      try {
        await sendAddFirend(userId, partyId)
        MessageBar.show({
          type: 'success',
          message: '发送添加好友请求成功'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const { isFriend } = this.state
    const { userId, id } = this.props
    return (
      <View style={styles.bottomBtn}>
        <TouchableOpacity style={styles.bottomBtnItem} onPress={this.handleAddPress.bind(this, userId, id)} >
          <View style={styles.textItem}>
            <MaterialIcons name={isFriend ? 'check' : 'person-add'} style={styles.btnText} />
            <Text style={styles.btnText}>{isFriend ? '互为好友' : '加好友'}</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.bottomBtnItem}>
          <View style={styles.textItem}>
            <Feather name="eye" style={styles.btnText} />
            <Text style={styles.btnText}>关注TA</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomBtn: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    height: px2dp(88),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff'
  },
  bottomBtnItem: {
    flex: 1,
    justifyContent: 'center'
  },
  textItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRightWidth: 1,
    borderRightColor: '#ddd'
  },
  btnText: {
    marginRight: px2dp(21),
    fontSize: px2sp(30),
    color: '#666'
  }
})
