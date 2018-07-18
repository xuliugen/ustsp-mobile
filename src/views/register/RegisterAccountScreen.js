import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'

import { px2dp, px2sp } from 'src/utils/device'
import { THEME_COLOR } from 'src/styles/common'
import TextInput from 'src/components/common/TextInput'

@withNavigation
export default class RegisterAccountScreen extends React.Component {
  static navigationOptions = {
    title: '输入手机号',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
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
              returnKeyType="done"
              style={styles.input} />
            <TouchableOpacity style={styles.sendCode}>
              <Text style={styles.sendCodeText}>发送验证码</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.accountContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="验证码"
              returnKeyType="done"
              style={styles.input} />
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.push('Register3')} style={styles.confirmBtn}>
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
