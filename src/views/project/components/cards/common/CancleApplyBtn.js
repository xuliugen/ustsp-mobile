import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'

export default class CancleApplyBtn extends React.Component {
  handlePressCancle = () => {
    Alert.alert('提示',
      '确定撤销此项目的报名请求？\n撤销后项目将进入中断', [
        {
          text: '取消'
        }, {
          text: '确定'
        }
      ])
  }
  render() {
    return (
      <TouchableOpacity style={styles.cancleBtn} onPress={this.handlePressCancle}>
        <Text style={styles.cancleEnroll}>取消报名</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cancleBtn: {
    position: 'absolute',
    bottom: px2dp(0),
    alignItems: 'center',
    width: SCREEN_WIDTH - px2dp(60),
    borderRadius: px2dp(10),
    marginBottom: px2dp(30),
    marginLeft: px2dp(30),
    marginRight: px2dp(30),
    paddingTop: px2dp(30),
    paddingBottom: px2dp(30),
    backgroundColor: '#3091e6'
  },
  cancleEnroll: {
    fontSize: px2sp(30),
    color: '#ffffff'
  }
})
