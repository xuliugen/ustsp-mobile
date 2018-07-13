import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { px2dp, px2sp } from 'src/utils/device'

export default class HeaderRightShare extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text><Feather style={styles.icon} name="share" /></Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginRight: px2dp(30)
  },
  icon: {
    color: '#fff',
    fontSize: px2sp(36)
  }
})
