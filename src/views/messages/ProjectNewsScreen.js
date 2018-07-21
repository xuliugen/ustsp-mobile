import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import NewsItem from './components/NewsItem'

@connect()
@withNavigation
export default class ProjectNewsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NewsItem />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {}
})
