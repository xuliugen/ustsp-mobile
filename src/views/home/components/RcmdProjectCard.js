import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import { DP } from '../../../utils/device'

export default class RcmdProjectCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.projectTitle}>推荐的项目标题1</Text>
            <Text style={styles.organizationInfo}>电子科技大学 / IT计算机类</Text>
            <Text style={styles.location}>四川 成都</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>9k</Text>
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Image source={require('../../../img/banner3.jpg')} style={styles.avatar} />
            <Text>贾志国</Text>
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
    paddingLeft: 35 / DP,
    paddingRight: 35 / DP,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eeedee',
    borderBottomWidth: 1,
    borderBottomColor: '#eeedee'
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 40 / DP,
    paddingTop: 40 / DP,
    borderBottomWidth: 1,
    borderBottomColor: '#eeedee'
  },
  info: {
    flex: 4
  },
  projectTitle: {
    fontSize: 50 / DP,
    marginBottom: 10 / DP
  },
  organizationInfo: {
    color: '#999',
    marginBottom: 10 / DP
  },
  location: {
    color: '#8f9ba7'
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  price: {
    fontSize: 60 / DP,
    color: '#368fe1'
  },

  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30 / DP,
    paddingTop: 30 / DP
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 20 / DP
  },
  timeContainer: {},
  time: {
    color: '#999'
  }
})
