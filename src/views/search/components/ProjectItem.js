import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import { parseMoney, parseProjectName } from 'src/utils/format'

export default class ProjectItem extends React.Component {
  render() {
    const { project } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.title}>{parseProjectName(project.projectName)}</Text>
            <Text style={styles.organization}>{project.province} / {project.subject}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{parseMoney(project.money)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 1,
    paddingHorizontal: px2dp(28),
    paddingVertical: px2dp(38),
    backgroundColor: '#fff'
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
  },
  title: {
    marginBottom: px2dp(20),
    fontSize: px2sp(32),
    color: '#333'
  },
  organization: {
    marginBottom: px2dp(20),
    color: '#999',
    fontSize: px2sp(28)
  },
  priceContainer: {
  },
  price: {
    fontSize: px2dp(40),
    color: '#368fe1'
  }
})
