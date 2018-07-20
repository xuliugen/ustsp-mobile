import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux'

import MessageBar from 'src/components/common/MessageBar'
import TextInput from 'src/components/common/TextInput'

import { px2dp, px2sp } from 'src/utils/device'
import { THEME_COLOR } from 'src/styles/common'
import { setRegisterPassword } from 'src/actions'

const mapStateToProps = state => ({
  password: state.register.password
})

@connect(mapStateToProps)
@withNavigation
export default class RegisterPasswordScreen extends React.Component {
  static navigationOptions = {
    title: '输入密码',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  state = {
    pwd2: null,
    passwordChecked: false,
    agreeChecked: false
  }

  checkPwdLength(pwd) {
    return pwd.length >= 6
  }

  onPwdIptBlur = () => {
    if (!this.checkPwdLength(this.props.password)) {
      MessageBar.show({
        type: 'warning',
        message: '密码长度须大于等于6位'
      })
    }
  }
  onPwd2IptChange = (pwd2) => {
    this.setState({ pwd2 }, () => {
      if (this.props.password !== this.state.pwd2) {
        this.setState({ passwordChecked: false })
      } else {
        this.setState({ passwordChecked: true })
      }
    })
  }
  onPwd2IptBlur = () => {
    if (this.props.password !== this.state.pwd2) {
      MessageBar.show({
        type: 'warning',
        message: '两次输入密码不一致'
      })
      this.setState({ passwordChecked: false })
      return
    }
    if (!this.checkPwdLength(this.props.password)) {
      MessageBar.show({
        type: 'warning',
        message: '密码长度须大于等于6位'
      })
      this.setState({ passwordChecked: false })
      return
    }
    this.setState({ passwordChecked: true })
  }
  onNextPress = () => {
    if (!this.state.passwordChecked) {
      MessageBar.show({
        type: 'warning',
        message: '密码有误'
      })
      return
    }
    if (!this.state.agreeChecked) {
      MessageBar.show({
        type: 'warning',
        message: '请先同意《uppfind平台使用协议》~'
      })
      return
    }
    this.props.navigation.push('Register4')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tipsText}>为了您的账号安全请设置登陆密码</Text>
        <View style={styles.formContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="输入登陆密码"
            returnKeyType="next"
            style={styles.input}
            secureTextEntry
            value={this.props.password}
            onChangeText={pwd => this.props.dispatch(setRegisterPassword(pwd))}
            onBlur={this.onPwdIptBlur}
          />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="再次确认密码"
            returnKeyType="done"
            secureTextEntry
            style={styles.input}
            value={this.state.pwd2}
            onChangeText={this.onPwd2IptChange}
            onBlur={this.onPwd2IptBlur}
          />
          <View style={styles.checkBoxContainer}>
            <CheckBox
              onClick={() => this.setState(prevState => ({ agreeChecked: !prevState.agreeChecked }))}
              isChecked={this.state.agreeChecked}
              checkBoxColor="#3091e6" />
            <Text style={styles.checkBoxText}>注册即代表同意</Text>
            <Text style={[styles.checkBoxText, styles.contract]}>《uppfind平台使用协议》</Text>
          </View>
          <TouchableOpacity onPress={this.onNextPress} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: px2dp(60),
    paddingTop: px2dp(54),
    backgroundColor: '#fff'
  },
  tipsText: {
    fontSize: px2sp(32),
    color: '#666'
  },

  formContainer: {
    marginTop: px2dp(25)
  },
  input: {
    marginTop: px2dp(30),
    paddingVertical: px2dp(28),
    borderBottomWidth: 2,
    borderBottomColor: '#ebf0f5',
    fontSize: px2sp(32),
    color: '#999'
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: px2dp(25)
  },
  checkBoxText: {
    marginLeft: px2dp(5),
    fontSize: px2sp(24),
    color: '#999'
  },
  contract: {
    color: '#8f9ba7'
  },
  submitBtn: {
    width: '100%',
    paddingVertical: px2dp(28),
    borderRadius: px2dp(10),
    backgroundColor: THEME_COLOR
  },
  submitBtnText: {
    textAlign: 'center',
    fontSize: px2dp(32),
    color: '#fff'
  }
})
