import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'

export default class ProjectItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.title}>推荐的项目标题1</Text>
            <Text style={styles.organization}>电子科技大学 / IT计算机类</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>9k</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 1,
    paddingHorizontal: px2dp(28),
    paddingVertical: px2dp(38),
    backgroundColor: '#fff'
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
  },
  title: {
    marginBottom: px2dp(20),
    fontSize: px2sp(32),
    color: '#333'
  },
  organization: {
    marginBottom: px2dp(20),
    color: '#999',
    fontSize: px2sp(28)
  },
  priceContainer: {
  },
  price: {
    fontSize: px2dp(40),
    color: '#368fe1'
  }
})
