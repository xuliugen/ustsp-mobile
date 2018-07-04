import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'

export default class TalentItem extends React.Component {
  render() {
    const { patent } = this.props
    return (
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <View>
            <Text style={styles.patentTitle}>{patent.patentName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>专利类型：{patent.patentType}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.statusText}>{patent.legalStatus}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    paddingLeft: px2dp(30),
    paddingVertical: px2dp(37),
    backgroundColor: '#fff'
  },
  leftContainer: {
    width: px2dp(486)
  },
  patentTitle: {
    fontSize: px2sp(32),
    color: '#333'
  },
  infoContainer: {
    marginTop: px2dp(23)
  },
  infoText: {
    fontSize: px2sp(28),
    color: '#999'
  },
  rightContainer: {
    width: px2dp(150),
    height: px2dp(60),
    paddingLeft: px2dp(37),
    paddingTop: px2dp(12),
    borderTopLeftRadius: px2dp(30),
    borderBottomLeftRadius: px2dp(30),
    backgroundColor: '#f7b35a'
  },
  statusText: {
    fontSize: px2sp(26),
    color: '#fff'
  }
})
