import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'

export default class TalentItem extends React.Component {
  render() {
    const { talent } = this.props
    return (
      <View style={styles.itemContainer}>
        <View>
          <Image source={{ uri: talent.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoTop}>
            <Text style={styles.name}>{talent.username}<Text style={styles.realName}>{talent.realName && `(${talent.realName})`}</Text></Text>
            {talent.isValid && <Image source={require('src/img/certificate.png')} style={styles.certificate} />}
          </View>
          <View style={styles.schoolContainer}>
            <Text style={styles.school}>{talent.location}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(20),
    backgroundColor: '#fff'
  },
  avatar: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(100 / 2)
  },
  infoContainer: {
    justifyContent: 'center',
    paddingLeft: px2dp(30)
  },
  infoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: px2dp(10)
    marginBottom: px2dp(16)
  },
  name: {
    marginRight: px2dp(15),
    fontSize: px2sp(28),
    color: '#333'
  },
  realName: {
    color: '#8f9ba7'
  },
  certificate: {
    height: px2dp(28),
    width: px2dp(30)
  },
  schoolContainer: {
    // marginTop: px2dp(20)
  },
  school: {
    fontSize: px2sp(28),
    color: '#999'
  }
})
