import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import MessageBar from 'src/components/common/MessageBar'
import TextInput from 'src/components/common/TextInput'

import { px2dp, px2sp } from 'src/utils/device'
import { THEME_COLOR } from 'src/styles/common'
import { setRegisterEmail, setRegisterClaimData, setRegisterUserId } from 'src/actions'
import { register, claimTchInfo } from 'src/ajax/auth'

const mapStateToProps = state => ({
  userType: state.register.userType,
  email: state.register.email,
  registerState: state.register
})

const emailReg = /\S+@\S+\.\S+/

@connect(mapStateToProps)
@withNavigation
export default class RegisterEmailScreen extends React.Component {
  static navigationOptions = {
    title: '邮箱',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  state = {
    emailChecked: false
  }

  onEmailIptBlur = () => {
    if (!emailReg.test(this.props.email)) {
      MessageBar.show({
        type: 'warning',
        message: '邮箱格式不正确'
      })
      return
    }
    this.setState({ emailChecked: true })
  }
  onNextPress = async () => {
    if (!emailReg.test(this.props.email)) {
      MessageBar.show({
        type: 'warning',
        message: '邮箱格式不正确'
      })
      return
    }
    const { registerState } = this.props
    const registerReq = {
      userType: registerState.userType,
      phone: registerState.phone,
      email: registerState.email,
      password: registerState.password
    }
    if (registerState.userType !== 2) { // not teacher
      await register(registerReq)
      this.props.navigation.push('RegisterComplete')
    } else {
      const USA_ORIGIN = 'https://weixin.uppfind.com/university-assistant-server'
      const [res1, res2] = await Promise.all([
        claimTchInfo(registerState.email),
        register(registerReq)
      ])
      if (res1.data.code === 200) { // 认领到了数据
        const claimData = res1.data.data
        claimData.icon = USA_ORIGIN + claimData.icon
        this.props.dispatch(setRegisterClaimData(claimData))

        const regRes = res2.data
        this.props.dispatch(setRegisterUserId(regRes.user.id))

        this.props.navigation.push('RegisterClaim')
      } else {
        this.props.navigation.push('RegisterComplete')
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tipsText}>{this.props.userType === 2 ? '验证您的邮箱，与学术库做匹配' : '输入邮箱'}</Text>
        <View style={styles.formContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="请输入邮箱"
            returnKeyType="done"
            style={styles.input}
            value={this.props.email}
            onChangeText={email => this.props.dispatch(setRegisterEmail(email))}
            onBlur={this.onEmailIptBlur}
          />
          <TouchableOpacity onPress={this.onNextPress} style={styles.claimBtn}>
            {/* <Text style={styles.claimBtnText}>{this.props.userType === 2 ? '检测认领' : '注册'}</Text> */}
            <Text style={styles.claimBtnText}>注册</Text>
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
  claimBtn: {
    width: '100%',
    paddingVertical: px2dp(28),
    borderRadius: px2dp(10),
    marginTop: px2dp(80),
    backgroundColor: THEME_COLOR
  },
  claimBtnText: {
    textAlign: 'center',
    fontSize: px2dp(32),
    color: '#fff'
  }
})
