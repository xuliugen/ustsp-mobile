import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

@connect()
@withNavigation
export default class InternalMessagesScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>InternalMessages</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})
