import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class App extends React.Component {
  handleLoginPress = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我的</Text>
        <Button onPress={this.handleLoginPress} title="login" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {}
})
