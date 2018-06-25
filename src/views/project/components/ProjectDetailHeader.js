import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import { Feather, Entypo } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import { STATUS_BAR_HEIGHT, px2dp, px2sp } from 'src/utils/device'

const ProjectDetailHeader = withNavigation((props) => {
  function handleGoBackPress() {
    props.navigation.goBack(null)
  }
  function handleSharePress() {
    alert('hi')
  }
  return (
    <ImageBackground source={require('./header_bg.png')} style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.pageHeader}>
          <Feather name="arrow-left" size={18} style={styles.goback} onPress={handleGoBackPress} />
          <Text style={styles.headerTitle}>项目详情</Text>
          <Entypo name="share" size={18} style={styles.share} onPress={handleSharePress} />
        </View>
        <View style={styles.projectHeader}>
          <View>
            <Text style={styles.projectTitle}>标题</Text>
          </View>
          <View style={styles.projectAbstract}>
            <Text style={styles.projectMoney}>¥12000</Text>
            <Text style={styles.projectDeadline}>报名截止于 1月22日</Text>
          </View>
        </View>
      </View>
    </ImageBackground>

  )
})

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
    paddingTop: px2dp(40),
    paddingHorizontal: px2dp(30)
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

export default ProjectDetailHeader
