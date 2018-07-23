import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { px2dp, px2sp, STATUS_BAR_HEIGHT } from 'src/utils/device'
import { MaterialIcons } from '@expo/vector-icons'
import { checkIfLogin } from 'src/selectors'

const mapStateToProps = state => {
  return {
    isLogin: checkIfLogin(state),
    user: state.auth.user,
    userInfo: state.auth.userInfo
  }
}

@connect(mapStateToProps)
@withNavigation
export default class MyScreenHeader extends React.Component {
  handleLoginPress = () => {
    this.props.navigation.navigate('Login')
  }
  handleSettingPress = () => {
    Alert.alert('settings！')
  }

  renderAvatar(isLogin) {
    if (isLogin) {
      return <Image source={{ uri: this.props.user.avatar }} style={styles.avatar} />
    } else {
      return <Image source={require('src/img/avatar1.png')} style={styles.avatar} />
    }
  }
  renderUserInfo() {
    const { user, userInfo } = this.props
    switch (user.userType) {
      case 1:
        return (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.infoLineOne} >
              <Text style={styles.infoText}>{userInfo.realName}</Text>
              {/* <Ionicons name="ios-female" size={16} color="#f63771" style={styles.genderIcon} /> */}
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
            {userInfo.isClaim === 1 && <View style={styles.infoLineThree} >
              <Image source={require('src/img/certificate.png')} style={styles.confirmIcon} />
              <Text style={styles.confirm}>已认证</Text>
            </View>}
          </View>
        )
    }
  }

  render() {
    const { isLogin } = this.props
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/background.png')} style={styles.bgImg}>
          <View style={styles.wrapper}>
            {/* <TouchableOpacity onPress={this.handleSettingPress} style={styles.settingContainer} >
              <Image source={require('./img/ico_setting.png')} style={styles.settingIcon} />
            </TouchableOpacity> */}
            <View style={styles.infoContainer} >
              <View style={styles.avatarContainer} >
                {this.renderAvatar(isLogin)}
              </View>
              {!isLogin
                ? <TouchableOpacity onPress={this.handleLoginPress} style={styles.loginPrompt}>
                  <Text style={styles.infoText}>请先登录<MaterialIcons name="keyboard-arrow-right" /></Text>
                </TouchableOpacity>
                : this.renderUserInfo()
              }
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
  settingContainer: {
    position: 'absolute',
    top: px2dp(33) + STATUS_BAR_HEIGHT,
    right: px2dp(42)
  },
  settingIcon: {
    width: px2dp(38),
    height: px2dp(38)
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
