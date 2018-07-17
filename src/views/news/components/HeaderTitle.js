import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { px2sp } from 'src/utils/device'

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>动态详情</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: px2sp(36),
    color: '#fff'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  }
})
