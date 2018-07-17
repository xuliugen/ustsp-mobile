import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class RegisterAccountScreen extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.push('Register3')}>
          <Text>2222222</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
