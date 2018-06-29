import React from 'react'
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import { withNavigation } from 'react-navigation'

/**
 * @todo isLogin
 * @todo Icon female & male
 * @todo isValid && infoLineThree
 */
@withNavigation
export default class MyScreenHeader extends React.Component {
  handleLoginPress = () => {
    this.props.navigation.navigate('Login')
  }

  handleSettingPress = () => {
    Alert.alert('settings！')
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/background.png')} style={styles.bgImg}>
          <TouchableOpacity onPress={this.handleSettingPress} style={styles.settingContainer} >
            <Image source={require('./img/ico_setting.png')} style={styles.settingIcon} />
          </TouchableOpacity>
          <View style={styles.infoContainer} >
            <View style={styles.avatarContainer} >
              <Image source={require('src/img/avatar1.png')} style={styles.avatar} />
            </View>
            <TouchableOpacity onPress={this.handleLoginPress} style={styles.loginPrompt}>
              <Text style={styles.infoText}>请先登录</Text>
              <MaterialIcons name="keyboard-arrow-right" style={styles.infoText} />
            </TouchableOpacity>
            {/* <View style={styles.infoLineOne} >
              <Text style={styles.infoText}>贾玲美</Text>
              <Ionicons name="ios-female" size={16} color="#f63771" style={styles.sexIcon} />
            </View>
            <Text style={[styles.infoText, styles.infoLineTwo]}>电子科技大学 | 美术学院 | 教授</Text>
            <View style={styles.infoLineThree} >
              <Image source={require('src/img/certificate.png')} style={styles.confirmIcon} />
              <Text style={styles.confirm}>已认证</Text>
            </View> */}
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  bgImg: {
    position: 'relative'
    // width: px2dp(750),
  },
  settingContainer: {
    position: 'absolute',
    top: px2dp(64),
    right: px2dp(42),
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
    marginTop: px2dp(83),
    borderRadius: px2dp(70),
    overflow: 'hidden'
  },
  avatar: {
    width: px2dp(140),
    height: px2dp(140),
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
  sexIcon: {
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
    marginRight: px2dp(11),
  },
  confirm: {
    fontSize: px2sp(26),
    color: '#ddd'
  }
})
