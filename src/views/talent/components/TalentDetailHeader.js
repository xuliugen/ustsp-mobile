import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { px2dp, px2sp, STATUS_BAR_HEIGHT } from 'src/utils/device'

import GoBackBtn from 'src/components/common/GoBackBtn'

const mapStateToProps = state => {
  return {
    user: state.talent.talent,
    userInfo: state.talent.talentInfo
  }
}

@connect(mapStateToProps)
@withNavigation
export default class MyScreenHeader extends React.Component {
  renderUserInfo() {
    const { userInfo } = this.props
    switch (Number(userInfo.type)) {
      case 1:
        return (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.infoLineOne} >
              <Text style={styles.infoText}>{userInfo.realName}</Text>
            </View>
            <Text style={[styles.infoText, styles.infoLineTwo]}>{userInfo.school} | {userInfo.college} | {userInfo.stuLevel}</Text>
          </View>
        )
      case 2:
        return (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.infoLineOne} >
              <Text style={styles.infoText}>{userInfo.realName}</Text>
            </View>
            <Text style={[styles.infoText, styles.infoLineTwo]}>{userInfo.school} | {userInfo.college} | {userInfo.title}</Text>
            {userInfo.isClaim === 1 && <View style={styles.infoLineThree} >
              <Image source={require('src/img/certificate.png')} style={styles.confirmIcon} />
              <Text style={styles.confirm}>已认证</Text>
            </View>}
          </View>
        )
      case 3:
        return (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.infoLineOne} >
              <Text style={styles.infoText}>{userInfo.realName}</Text>
            </View>
            <Text style={[styles.infoText, styles.infoLineTwo]}>{userInfo.industry} | {userInfo.nature} | {userInfo.scale}</Text>
          </View>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./bg.png')} style={styles.bgImg}>
          <View style={styles.wrapper}>
            <View style={styles.infoContainer} >
              <View style={styles.avatarContainer} >
                <Image source={{ uri: this.props.user.avatar }} style={styles.avatar} />
              </View>
              { this.renderUserInfo() }
            </View>
            <View style={styles.goBackContainer}>
              <GoBackBtn />
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  bgImg: {},
  wrapper: {
    position: 'relative',
    paddingTop: STATUS_BAR_HEIGHT
  },

  goBackContainer: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT
  },

  infoContainer: {
    alignItems: 'center',
    paddingBottom: px2dp(35)
  },
  avatarContainer: {
    // position: 'relative',
    marginTop: px2dp(55),
    borderRadius: px2dp(70),
    overflow: 'hidden'
  },
  avatar: {
    width: px2dp(140),
    height: px2dp(140)
  },

  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px2dp(22)
  },

  infoLineOne: {
    position: 'relative',
    marginTop: px2dp(22)
  },
  infoText: {
    fontSize: px2sp(28),
    color: '#fff'
  },
  genderIcon: {
    position: 'absolute',
    top: px2dp(4),
    right: -px2dp(42)
  },
  infoLineTwo: {
    marginTop: px2dp(18)
  },
  infoLineThree: {
    flexDirection: 'row',
    marginTop: px2dp(20)
  },
  confirmIcon: {
    width: px2dp(30),
    height: px2dp(30),
    marginTop: px2dp(4),
    marginRight: px2dp(11)
  },
  confirm: {
    fontSize: px2sp(26),
    color: '#ddd'
  }
})
