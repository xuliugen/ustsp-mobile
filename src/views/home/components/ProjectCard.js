import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import { px2dp, px2sp } from '../../../utils/device'
import { Entypo } from '@expo/vector-icons'

export default class ProjectCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.title}>推荐的项目标题1</Text>
            <Text style={styles.organization}>电子科技大学 / IT计算机类</Text>
            <View style={styles.locationContainer}>
              <Entypo name="location-pin" size={20} color="#8f9ba7" />
              <Text style={styles.location}>四川 成都</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>9k</Text>
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Image source={require('../../../img/banner3.jpg')} style={styles.avatar} />
            <Text style={styles.name}>贾志国</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>2018-1-30</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    borderTopWidth: 1,
    borderTopColor: '#eeedee',
    borderBottomWidth: 1,
    borderBottomColor: '#eeedee',
    backgroundColor: '#fff'
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: px2dp(40),
    paddingTop: px2dp(40),
    borderBottomWidth: 1,
    borderBottomColor: '#eeedee'
  },
  info: {
  },
  title: {
    fontSize: px2sp(32),
    marginBottom: px2dp(20)
  },
  organization: {
    marginBottom: px2dp(20),
    color: '#999'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  location: {
    color: '#8f9ba7'
  },
  priceContainer: {
  },
  price: {
    fontSize: px2dp(40),
    color: '#368fe1'
  },

  userContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(100)
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(60 / 2),
    marginRight: px2dp(20)
  },
  name: {
    fontSize: px2sp(28),
    color: '#333'
  },
  timeContainer: {},
  time: {
    fontSize: px2sp(26),
    color: '#999'
  }
})
