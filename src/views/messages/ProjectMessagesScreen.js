import React from 'react'
import { View, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp } from 'src/utils/device'

import NewsItem from './components/NewsItem'

@connect()
@withNavigation
export default class ProjectMessagesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NewsItem />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: px2dp(30),
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
