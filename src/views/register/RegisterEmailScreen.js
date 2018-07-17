import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class RegisterEmailScreen extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.push('RegisterComplete')}>
          <Text>44444444</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
