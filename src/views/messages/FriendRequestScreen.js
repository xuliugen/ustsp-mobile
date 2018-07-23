import React from 'react'
import { View, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
// https://github.com/dancormier/react-native-swipeout
import Swipeout from 'react-native-swipeout'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp } from 'src/utils/device'

import RequestItem from './components/RequestItem'

@connect()
@withNavigation
export default class FriendRequestScreen extends React.Component {
  render() {
    const swipeoutBtns = [
      {
        text: '不通过',
        backgroundColor: '#fa2024',
        color: '#fff'
      }
    ]
    return (
      <View style={styles.conatiner}>
        <Swipeout autoClose right={swipeoutBtns}>
          <RequestItem btnText={'通过'} />
        </Swipeout>
        <RequestItem passed btnText={'已通过'} />
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
