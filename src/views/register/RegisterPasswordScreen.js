import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class RegisterPasswordScreen extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.push('Register4')}>
          <Text>33333</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
