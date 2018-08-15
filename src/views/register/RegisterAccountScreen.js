import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { px2dp, px2sp } from 'src/utils/device'
import { THEME_COLOR } from 'src/styles/common'
import { setRegisterPhone } from 'src/actions'
import { sendPhoneCode, checkVerifyCode, checkUsernameExist } from 'src/ajax/auth'

import TextInput from 'src/components/common/TextInput'
import MessageBar from 'src/components/common/MessageBar'

const mapStateToProps = state => ({
  phone: state.register.phone
})
const phoneReg = /^1[0-9]{10}$/

@connect(mapStateToProps)
@withNavigation
export default class RegisterAccountScreen extends React.Component {
  static navigationOptions = {
    title: '输入手机号',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  state = {
    code: null,
    phoneChecked: false,
    codeChecked: false,
    cd: 0,
    processId: null
  }

  // 验证码cd
  process() {
    if (this.state.cd !== 0) {
      const processId = setTimeout(() => {
        this.setState(prevState => ({
          cd: prevState.cd - 1
        }), this.process)
      }, 1000)
      this.setState({ processId })
    } else {
      this.terminate()
    }
  }
  // 终止验证码cd
  terminate = () => {
    if (this.state.processId) {
      clearTimeout(this.state.processId)
    }
    this.setState({
      cd: 0,
      processId: null
    })
  }
  // check code
  async checkCode() {
    if (this.state.codeChecked) return
    const { data } = await checkVerifyCode(this.state.code, this.props.phone)
    if (!data) {
      // MessageBar.show({
      //   type: 'warning',
      //   message: '验证码错误'
      // })
      return
    }
    this.terminate()
    this.setState({ codeChecked: true })
  }
  // check phone number
  async checkPhone() {
    if (this.state.phoneChecked) {
      return
    }
    const { phone } = this.props
    if (!phoneReg.test(phone)) {
      MessageBar.show({
        type: 'warning',
        message: '手机号不正确'
      })
      return
    }
    const { data } = await checkUsernameExist(phone)
    if (data) {
      MessageBar.show({
        type: 'warning',
        message: '手机号已注册'
      })
      return
    }
    this.setState({ phoneChecked: true })
    return true
  }

  onPhoneIptChange = (phone) => {
    this.props.dispatch(setRegisterPhone(phone))
  }
  // onPhoneIptBlur = () => {
  //   this.checkPhone()
  // }
  onSendCodeBtnPress = async () => {
    await this.checkPhone()
    if (this.state.phoneChecked) {
      sendPhoneCode(this.props.phone)
      this.setState({ cd: 60 }, () => {
        this.process()
      })
    }
  }
  onCodeIptChange = (code) => {
    this.setState({ code }, this.checkCode)
  }
  onNextBtnPress = () => {
    this.state.codeChecked && this.props.navigation.push('Register3')
  }

  renderCodeBlock() {
    if (this.state.codeChecked) {
      return <View style={styles.sendCode}>
        <Text style={styles.sendCodeText}>验证成功</Text>
      </View>
    }
    return this.state.cd === 0
      ? <TouchableOpacity style={styles.sendCode} onPress={this.onSendCodeBtnPress}>
        <Text style={styles.sendCodeText}>发送验证码</Text>
      </TouchableOpacity>
      : <View style={styles.sendCode}>
        <Text style={styles.sendCodeText}>重新发送{this.state.cd}s</Text>
      </View>
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tipsText}>设置账号密码</Text>
        <View style={styles.formContainer}>
          <View style={styles.accountContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="输入手机号"
              returnKeyType="next"
              keyboardType="phone-pad"
              style={styles.input}
              value={this.props.phone}
              onChangeText={this.onPhoneIptChange}
              onBlur={this.onPhoneIptBlur}
              editable={!this.state.codeChecked}
            />
            {this.renderCodeBlock()}
          </View>
          <View style={styles.accountContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="验证码"
              returnKeyType="done"
              keyboardType="phone-pad"
              value={this.state.code}
              onChangeText={this.onCodeIptChange}
              // onBlur={this.onCodeIptBlur}
              style={styles.input}
            />
          </View>
          <TouchableOpacity onPress={this.onNextBtnPress} style={styles.confirmBtn}>
            <Text style={styles.confirmBtnText}>下一步</Text>
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
  accountContainer: {
    position: 'relative'
  },
  input: {
    marginTop: px2dp(30),
    paddingVertical: px2dp(28),
    borderBottomWidth: 2,
    borderBottomColor: '#ebf0f5',
    fontSize: px2sp(32),
    color: '#999'
  },
  sendCode: {
    position: 'absolute',
    bottom: px2dp(26),
    right: 0
  },
  sendCodeText: {
    fontSize: px2sp(26),
    color: '#8f9ba7'
  },
  confirmBtn: {
    width: '100%',
    paddingVertical: px2dp(28),
    borderRadius: px2dp(10),
    marginTop: px2dp(60),
    backgroundColor: THEME_COLOR
  },
  confirmBtnText: {
    textAlign: 'center',
    fontSize: px2dp(32),
    color: '#fff'
  }
})
