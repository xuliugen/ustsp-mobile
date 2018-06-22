import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { px2sp } from 'src/utils/device'

export default class HeaderRightFilter extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => alert('This is a button!')}>
          <Text style={styles.headerRightText}><Feather name="filter" />&nbsp;筛选</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 56
  },
  headerRightText: {
    // marginLeft: px2dp(16),
    // marginRight: px2dp(32),
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: px2sp(28)
  }
})
