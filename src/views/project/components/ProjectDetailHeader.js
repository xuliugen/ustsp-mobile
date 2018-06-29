import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Feather, Entypo } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import { STATUS_BAR_HEIGHT, px2dp, px2sp } from 'src/utils/device'
import { parseTime } from 'src/utils/format'
import { fetchProjectDetail } from 'src/ajax/project'

/**
 * @todo Use Redux to pass state to detail content and detail header
 */
@withNavigation
export default class ProjectDetailHeader extends React.Component {
  state = {
    project: {}
  }

  handleGoBackPress = () => {
    this.props.navigation.goBack(null)
  }
  handleSharePress = () => {
    alert('hi')
  }

  render() {
    const { project } = this.props
    return (
      <ImageBackground source={require('./header_bg.png')} style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.pageHeader}>
            <TouchableOpacity style={styles.headerIconContainer} onPress={this.handleGoBackPress}>
              <Feather name="arrow-left" size={18} style={styles.goback} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>项目详情</Text>
            <TouchableOpacity style={styles.headerIconContainer} onPress={this.handleSharePress}>
              <Entypo name="share" size={18} style={styles.share} />
            </TouchableOpacity>
          </View>
          <View style={styles.projectHeader}>
            <View>
              <Text style={styles.projectTitle}>{project.projectName}</Text>
            </View>
            <View style={styles.projectAbstract}>
              <Text style={styles.projectMoney}>¥{project.money}</Text>
              <Text style={styles.projectDeadline}>报名截止于 {parseTime(project.deadline, 'YYYY年MM月DD日')}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // height: px2dp(326)
  },
  wrapper: {
    paddingTop: STATUS_BAR_HEIGHT,
  },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: px2dp(40),
    // paddingHorizontal: px2dp(30)
  },
  headerIconContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goback: {
    color: '#fff'
  },
  headerTitle: {
    fontSize: px2sp(36),
    color: '#fff'
  },
  share: {
    color: '#fff'
  },

  projectHeader: {
    marginTop: px2dp(80),
    paddingLeft: px2dp(30)
  },
  projectTitle: {
    fontSize: px2dp(36),
    color: '#fff'
  },
  projectAbstract: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px2dp(30),
    marginBottom: px2dp(50)
  },
  projectMoney: {
    fontSize: px2dp(36),
    color: '#1dbbae'
  },
  projectDeadline: {
    marginLeft: px2dp(20),
    fontSize: px2dp(26),
    color: '#ddd'
  }
})
