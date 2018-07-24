import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'

import { px2sp, px2dp } from 'src/utils/device'
import { parseTime } from 'src/utils/format'
import { THEME_COLOR } from 'src/styles/common'
import { fetchOneMessage } from 'src/ajax/msg'

@withNavigation
export default class ProjectMsgItem extends React.Component {
  onContainerPress = () => {
    const { msg } = this.props
    if (msg.status === 2) {
      fetchOneMessage(msg.id)
      this.props.refreshList()
    }
    this.props.navigation.navigate('ProjectDetail', {
      projectId: msg.relateId
    })
  }

  render() {
    const { msg } = this.props
    return (
      <TouchableOpacity onPress={this.onContainerPress}>
        <View style={styles.itemContainer}>
          <View>
            <Image source={{ uri: msg.senderAvatar }} style={styles.newsPhoto} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.title}>
              <View style={{ width: px2dp(350) }}>
                <Text style={styles.projectName}>{msg.messageContent}</Text>
              </View>
              <Text style={styles.contentText}>{parseTime(msg.createTime)}</Text>
            </View>
            <View>
              <Text style={msg.status === 2 ? styles.contentTextRead : styles.contentText}>项目有了新进度，请注意查看</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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

  newsPhoto: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(100 / 2)
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: px2dp(30)
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px2dp(16)
  },
  projectName: {
    fontSize: px2sp(28),
    color: '#333'
  },
  contentText: {
    fontSize: px2sp(28),
    color: '#999'
  },
  contentTextRead: {
    fontSize: px2sp(28),
    color: THEME_COLOR
  }
})
