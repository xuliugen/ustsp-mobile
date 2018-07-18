import React from 'react'
import { withNavigation } from 'react-navigation'
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Alert, AsyncStorage } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { userLogin } from 'src/actions'

import TextInput from 'src/components/common/TextInput'
import { px2dp, px2sp } from 'src/utils/device'
import { APP_BACKGROUD_COLOR, THEME_COLOR } from 'src/styles/common'
import MessageBar from 'src/components/common/MessageBar'

@connect()
@withNavigation
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
    this.pwdIptRef = React.createRef()
  }

  async handleLogin() {
    if (!this.state.userName) {
      MessageBar.show({
        type: 'warning',
        message: '请输入手机号或邮箱'
      })
      return
    }
    if (!this.state.password) {
      MessageBar.show({
        type: 'warning',
        message: '请输入密码'
      })
      return
    }
    try {
      const { token, user } = await this.props.dispatch(userLogin(this.state))
      this.props.navigation.navigate('Home')
      AsyncStorage.setItem('token', token)
      AsyncStorage.setItem('user', JSON.stringify(user))
      MessageBar.show({
        message: '登录成功'
      })
    } catch (error) {
      if (error && error.response) {
        const { status } = error.response
        if (status === 401 || status === 404) {
          MessageBar.show({
            type: 'warning',
            message: '用户名或密码错误'
          })
        }
        this.pwdIptRef.current.clear()
      }
    }
  }

  handleForgetPwdPress() {
    Alert.alert('forget password')
  }
  handleLoginSubmit = () => {
    this.handleLogin()
  }
  handleLoginPress = () => {
    this.handleLogin()
  }
  handleRegisterPress = () => {
    this.props.navigation.push('Register1')
  }
  handleGoBack = () => {
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <View>
          <ImageBackground source={require('src/img/ellipse.png')} style={styles.bgImg} resizeMode="stretch">
            <View style={styles.titleText}>
              <Feather name="arrow-left" size={28} style={styles.goback} onPress={this.handleGoBack} />
              <Text style={styles.titleTextLineOne}>欢迎使用UppFind</Text>
              <View>
                <Text style={styles.titleTextLineTwo}>请先登陆</Text>
              </View>
            </View>
            <View style={styles.brand}>
              <Image style={styles.brandImage} source={require('src/img/uppfind.png')} />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.container}>
          {/* <View style={styles.loginTab}></View> */}
          <View style={styles.loginForm}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="手机号或邮箱"
              returnKeyType="next"
              style={styles.input}
              value={this.state.userName}
              onChangeText={(text) => this.setState({ userName: text })}
              onSubmitEditing={() => this.pwdIptRef.current.focus()} />
            <View style={styles.pswContainer}>
              <TextInput
                inputRef={this.pwdIptRef}
                underlineColorAndroid="transparent"
                placeholder="密码"
                secureTextEntry
                returnKeyType="done"
                style={styles.input}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                onSubmitEditing={this.handleLoginSubmit} />
              <TouchableOpacity onPress={this.handleForgetPwdPress} style={styles.forgetPwd}>
                <Text style={styles.forgetPwdText}>忘记密码？</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={this.handleLoginPress} style={[styles.loginBtn, styles.btns]}>
                <Text style={[styles.loginText, styles.btnsText]}>登陆UppFind</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleRegisterPress} style={[styles.regBtn, styles.btns]}>
                <Text style={[styles.regText, styles.btnsText]}>注册新用户</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: APP_BACKGROUD_COLOR
  },
  bgImg: {
    position: 'relative',
    width: '100%',
    height: px2dp(272),
    marginTop: px2dp(48)
  },
  goback: {
    position: 'absolute',
    top: -px2dp(60),
    left: -px2dp(55),
    color: '#666'
  },
  container: {
    position: 'relative',
    height: '100%',
    // borderTopRightRadius: px2dp(300),
    backgroundColor: '#fff'
  },
  titleText: {
    marginTop: px2dp(93),
    marginLeft: px2dp(60)
  },
  titleTextLineOne: {
    fontSize: px2sp(36),
    color: '#666'
  },
  titleTextLineTwo: {
    fontSize: px2sp(36),
    color: '#666',
    marginTop: px2dp(19)
  },
  brand: {
    position: 'absolute',
    top: px2dp(63),
    right: px2dp(60),
    alignItems: 'center',
    width: px2dp(140),
    height: px2dp(140),
    borderRadius: px2dp(70),
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#9fbfde',
    shadowOpacity: 0.7,
    shadowRadius: px2dp(5),
    elevation: px2dp(5),
    backgroundColor: '#fff'
  },
  brandImage: {
    marginTop: px2dp(30),
    width: px2dp(60),
    height: px2dp(80)
  },
  loginTab: {
    height: px2dp(71),
    // marginTop: px2dp(88),
    marginLeft: px2dp(60)
  },
  loginForm: {
    paddingHorizontal: px2dp(60),
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  input: {
    marginTop: px2dp(30),
    paddingVertical: px2dp(28),
    borderBottomWidth: 2,
    borderBottomColor: '#ebf0f5',
    fontSize: px2sp(32),
    color: '#999'
  },
  pswContainer: {
    position: 'relative'
  },
  forgetPwd: {
    position: 'absolute',
    bottom: px2dp(26),
    right: 0
  },
  forgetPwdText: {
    fontSize: px2sp(26),
    color: '#8f9ba7'
  },
  btns: {
    width: '100%',
    paddingVertical: px2dp(28),
    borderRadius: px2dp(10)
  },
  loginBtn: {
    marginTop: px2dp(60),
    backgroundColor: THEME_COLOR
  },
  regBtn: {
    marginTop: px2dp(30),
    borderWidth: px2dp(2),
    borderColor: THEME_COLOR
  },
  btnsText: {
    textAlign: 'center',
    fontSize: px2dp(32)
  },
  loginText: {
    color: '#fff'
  },
  regText: {
    color: THEME_COLOR
  }
})
