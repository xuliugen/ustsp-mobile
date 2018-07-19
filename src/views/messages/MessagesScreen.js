import React from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { MessageStackNavigator } from 'src/Root'

@connect()
@withNavigation
export default class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: '消息中心',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: <View />
  }

  render() {
    return (
      <MessageStackNavigator />
    )
  }
}
