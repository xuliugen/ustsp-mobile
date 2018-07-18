import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box'

import TextInput from 'src/components/common/TextInput'
import { px2dp, px2sp } from 'src/utils/device'
import { THEME_COLOR } from 'src/styles/common'

@withNavigation
export default class RegisterPasswordScreen extends React.Component {
  static navigationOptions = {
    title: '注册',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tipsText}>为了您的账号安全请设置登陆密码</Text>
        <View style={styles.formContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="输入登陆密码"
            returnKeyType="done"
            style={styles.input} />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="再次确认密码"
            returnKeyType="done"
            style={styles.input} />
          <View style={styles.checkBoxContainer}>
            <CheckBox
              onClick={()=>{}}
              isChecked={true}
              checkBoxColor="#3091e6" />
            <Text style={styles.checkBoxText}>注册即代表同意</Text>
            <Text style={[styles.checkBoxText, styles.contract]}>《uppfind平台使用协议》</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.push('Register4')} style={styles.submitBtn}>
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
