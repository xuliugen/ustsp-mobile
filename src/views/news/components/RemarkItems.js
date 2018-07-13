import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'

var dimensions = require('Dimensions')
var {width} = dimensions.get('window')

export default class RemarkItems extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('src/img/avatar1.png')} style={styles.avatar} />
        <View style={styles.remarkContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.name}>戴佩妮</Text>
            <Text style={styles.date}>2018-10-20</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.text}>这个活动真是太好啦，帮助了我很多，谢谢主办方，为主办方疯狂打call！</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  avatar: {
    width: px2dp(70),
    height: px2dp(70),
    marginVertical: px2dp(30),
    marginRight: px2dp(30),
    borderRadius: px2dp(35)
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: px2dp(30)
  },
  remarkContainer: {
    flexDirection: 'column',
    borderBottomWidth: px2dp(1),
    borderBottomColor: APP_BACKGROUD_COLOR
  },
  name: {
    fontSize: px2dp(28),
    color: '#3091e6'
  },
  date: {
    marginLeft: px2dp(30),
    fontSize: px2sp(28),
    color: '#999999'
  },
  bottomContainer: {
    width: width - px2dp(130),
    paddingBottom: px2dp(30),
    paddingRight: px2dp(30)
  },
  text: {
    fontSize: px2sp(28),
    color: '#666666'
  }
})
