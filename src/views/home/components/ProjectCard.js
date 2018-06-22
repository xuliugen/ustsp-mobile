import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { px2dp, px2sp } from '../../../utils/device'
import { parseMoney, parseTime } from '../../../utils/format'

export default class ProjectCard extends React.Component {
  parseProjectName(name) {
    if (name.length > 15) {
      name = name.substr(0, 15) + '...'
    }
    return name
  }
  parseLocation(province, city) {
    if (province !== city) {
      return `${province} ${city}`
    } else {
      return province
    }
  }

  render() {
    const { project } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.title}>{this.parseProjectName(project.projectName)}</Text>
            <Text style={styles.organization}>{project.subject}</Text>
            <View style={styles.locationContainer}>
              <Entypo name="location-pin" size={13} color="#8f9ba7" />
              <Text style={styles.location}>{this.parseLocation(project.province, project.city)}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{parseMoney(project.money)}</Text>
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Image source={{ uri: project.ownerAvatar }} style={styles.avatar} />
            <Text style={styles.name}>{project.ownerName}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{parseTime(project.releaseTime)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff'
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: px2dp(40),
    paddingTop: px2dp(40),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  info: {
  },
  title: {
    marginBottom: px2dp(20),
    fontSize: px2sp(32)
  },
  organization: {
    marginBottom: px2dp(20),
    color: '#999',
    fontSize: px2sp(28)
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  location: {
    color: '#8f9ba7',
    fontSize: px2sp(26)
  },
  priceContainer: {
  },
  price: {
    fontSize: px2dp(40),
    color: '#368fe1'
  },

  userContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(100)
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(60 / 2),
    marginRight: px2dp(20)
  },
  name: {
    fontSize: px2sp(28),
    color: '#333'
  },
  timeContainer: {},
  time: {
    fontSize: px2sp(26),
    color: '#999'
  }
})
