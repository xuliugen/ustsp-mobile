import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { px2dp, px2sp } from '../../../utils/device'

export default class TalentItem extends React.Component {
  render() {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Image source={require('../../../img/banner1.png')} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoTop}>
            <Text style={styles.name}>周建华</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>教授</Text>
            </View>
            <Image source={require('../../../img/certificate.png')} style={styles.certificate} />
          </View>
          <View>
            <Text style={styles.school}>四川大学 / 新闻学院</Text>
          </View>
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
    paddingLeft: px2dp(30)
  },
  infoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dp(10)
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
  school: {
    fontSize: px2sp(28),
    color: '#999'
  }
})
