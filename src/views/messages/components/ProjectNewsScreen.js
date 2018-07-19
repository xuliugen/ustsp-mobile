import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

@connect()
@withNavigation
export default class ProjectNewsScreen extends React.Component {

  render() {
    return (
      <View>
        <Text>projectNews</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})
