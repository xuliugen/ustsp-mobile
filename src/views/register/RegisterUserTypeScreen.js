import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class RegisterUserTypeScreen extends React.Component {
  static navigationOptions = {
    title: '注册',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.push('Register2')}>
          <Text>11111111111</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
