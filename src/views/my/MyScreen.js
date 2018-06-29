import React from 'react'
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'
import { userLogout } from 'src/actions'
import { connect } from 'react-redux'

@connect()
@withNavigation
export default class App extends React.Component {
  handleLoginPress = () => {
    this.props.navigation.navigate('Login')
  }
  handleLogoutPress = () => {
    this.props.dispatch(userLogout())
    AsyncStorage.multiRemove(['token', 'user'])
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我的</Text>
        <Button onPress={this.handleLoginPress} title="login" />
        <Button onPress={this.handleLogoutPress} title="logout" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {}
})
