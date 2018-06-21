import React from 'react'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'

import { px2dp, px2sp } from '../../../utils/device'

export default class Talents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentontainer}
        horizontal showsHorizontalScrollIndicator={false}>
        <Talent />
        <Talent />
        <Talent />
        <Talent />
        <Talent />
      </ScrollView>
    )
  }
}

function Talent(props) {
  return (
    <View style={styles.talentContainer}>
      <View style={styles.avatarContainer}>
        <Image source={require('../../../img/banner3.jpg')} style={styles.avatar} />
      </View>
      <Text style={styles.name}>贾志国</Text>
      <Text style={styles.university}>川大</Text>
      <Text style={styles.title}>副教授</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff'
  },
  contentontainer: {
    paddingLeft: px2dp(60)
  },

  talentContainer: {
    flexDirection: 'column',
    paddingTop: px2dp(40),
    paddingBottom: px2dp(40),
    marginRight: px2dp(60),
    alignItems: 'center'
  },
  avatarContainer: {
    marginBottom: px2dp(20)
  },
  avatar: {
    width: px2dp(120),
    height: px2dp(120),
    borderRadius: px2dp(120 / 2)
  },
  name: {
    fontSize: px2sp(28),
    marginBottom: px2dp(10)
  },
  university: {
    fontSize: px2sp(28),
    color: '#999',
    marginBottom: px2dp(10)
  },
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  }
})
