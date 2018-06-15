import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import { APP_BACKGROUD_COLOR } from '../../styles/common'

export default class ProjectSearch extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'linear-gradient(top bottom, white, black)'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>1243</Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
