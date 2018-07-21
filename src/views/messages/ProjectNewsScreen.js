import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

@connect()
@withNavigation
export default class ProjectNewsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>project news</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {}
})
