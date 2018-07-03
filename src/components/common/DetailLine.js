import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'

export default (props) => (
  <View style={styles.container}>
    <View style={[styles.detailBox, styles.detailBoxLeft]}>
      <Text style={[styles.detailBoxLabel, styles.label]}>{props.leftLabel}</Text>
      <Text style={styles.text}>{props.leftText}</Text>
    </View>
    <View style={styles.detailBox}>
      <Text style={[styles.detailBoxLabel, styles.label]}>{props.rightLabel}</Text>
      <Text style={styles.text}>{props.rightText}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  detailBox: {
    flex: 1,
    paddingTop: px2dp(26),
    paddingBottom: px2dp(36),
    paddingLeft: px2dp(30),
    backgroundColor: '#fff'
  },
  detailBoxLeft: {
    borderRightWidth: 1,
    borderRightColor: '#ddd'
  },
  detailBoxLabel: {
    marginBottom: px2dp(20)
  },
  label: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  text: {
    fontSize: px2sp(32),
    color: '#333'
  }
})
