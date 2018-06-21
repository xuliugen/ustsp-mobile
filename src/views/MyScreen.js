import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class App extends React.Component {
  handleLogin = () => {
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View>
        <Text>我的</Text>
        <Button onPress={this.handleLogin} title="login" />
      </View>
    )
  }
}
