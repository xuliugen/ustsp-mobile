import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'

import ProjectDetailHeader from './components/ProjectDetailHeader'

export default class ProjectDetailScreen extends React.Component {
  static navigationOptions = {
    header: <ProjectDetailHeader />
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>project detail</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {}
})
