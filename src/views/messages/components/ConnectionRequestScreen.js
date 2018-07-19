import React from 'react'
import { View, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import RequestItem from './items/RequestItem'
import { px2dp } from 'src/utils/device'

@connect()
@withNavigation
export default class ConnectionRequestScreen extends React.Component {

  render() {
    return (
      <View style={styles.conatiner}>
        <RequestItem />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingTop: px2dp(30),
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
