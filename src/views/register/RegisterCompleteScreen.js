import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class RegisterCompleteScreen extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.popToTop()}>
          <Text>点击登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
