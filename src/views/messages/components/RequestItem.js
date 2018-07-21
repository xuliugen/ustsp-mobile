import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import {THEME_COLOR} from 'src/styles/common'

export default class TalentItem extends React.Component {

  handleApprovePress = () => {}

  render() {
    const { passed, btnText } = this.props
    return (
      <View style={styles.itemContainer}>
        <View>
          <Image source={require('src/img/avatar1.png')} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoTop}>
            <Text style={styles.name}>贾治国</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>教授</Text>
            </View>
            <Image source={require('src/img/certificate.png')} style={styles.certificate} />
          </View>
          <View style={styles.applyInfoContainer}>
            <Text style={styles.applyInfo}>请求加您为好友</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.handleApprovePress} style={passed === true ? [styles.btn, styles.approvedBtn] : [styles.btn, styles.approveBtn]}>
            <Text style={styles.approveText}>{btnText}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
