import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {px2dp, px2sp} from "../../../utils/device";
import {parseTime, parseUserType} from "../../../utils/format";

export default class ProjectPublisher extends React.Component {
  render() {
    const { project } = this.props
    return (
      <View style={[styles.publisherBlock, styles.block]}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Image source={{ uri: project.ownerAvatarUrl }} style={styles.publisherAvatar} />
          </View>
          <View style={styles.publisherInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.publisherName}>{project.ownerName}</Text>
              <Text style={styles.publisherTitle}>{project.ownerLocation} / {parseUserType(project.ownerType)}</Text>
            </View>
            <View>
              <Text style={styles.publisherDate}>发布于 {parseTime(project.createTime)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

styles = StyleSheet.create({
  publisherBlock: {
    marginBottom: px2dp(30 + 88),
    padding: px2dp(30),
    backgroundColor: '#fff'
  },
  block: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  publisherAvatar: {
    width: px2dp(100),
    height: px2dp(100)
  },
  publisherInfo: {
    marginLeft: px2dp(22),
    paddingVertical: px2dp(12),
    justifyContent: 'space-between'
  },
  publisherName: {
    marginRight: px2dp(22),
    fontSize: px2sp(28),
    color: '#333'
  },
  publisherTitle: {
    fontSize: px2sp(28),
    color: '#999'
  },
  publisherDate: {
    fontSize: px2sp(26),
    color: '#999'
  }
})
