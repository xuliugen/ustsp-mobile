import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { px2sp, px2dp } from 'src/utils/device'
import {projectStatusNum2Str} from 'src/utils/format'

export default class PublishedProjectItem extends React.Component {
  render() {
    const { project } = this.props
    return (
      <View style={[styles.container, (project.status >= 6 && styles.containerFinished)]} >
        <Text style={styles.title}>{project.projectName}</Text>
        <Text style={styles.subject}>{project.type} / {project.subject}</Text>
        <View style={styles.bottomLine}>
          <Text style={styles.location}>
            <MaterialIcons name="location-on" /> {project.province} {project.city}
          </Text>
          <Text style={styles.status}>{projectStatusNum2Str(project.status)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: px2dp(28),
    paddingHorizontal: px2dp(37),
    paddingVertical: px2dp(31),
    backgroundColor: '#fff'
  },
  containerFinished: {
    opacity: 0.5
  },
  title: {
    fontSize: px2sp(32),
    color: '#333'
  },
  subject: {
    marginVertical: px2dp(15),
    fontSize: px2sp(28),
    color: '#999'
  },
  bottomLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  location: {
    fontSize: px2sp(26),
    color: '#8f9ba7'
  },
  status: {
    paddingVertical: px2dp(10),
    paddingHorizontal: px2dp(25),
    borderRadius: px2dp(10),
    backgroundColor: '#ebf0f5',
    fontSize: px2sp(24),
    color: '#1dbbae'
  }
})
