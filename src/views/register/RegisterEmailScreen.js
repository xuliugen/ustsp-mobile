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
export default class RegisterEmailScreen extends React.Component {
  static navigationOptions = {
    title: '验证邮箱',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tipsText}>验证您的邮箱，与学术库做匹配</Text>
        <View style={styles.formContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="请输入邮箱"
            returnKeyType="done"
            style={styles.input} />
          <TouchableOpacity onPress={() => this.props.navigation.push('RegisterComplete')} style={styles.claimBtn}>
            <Text style={styles.claimBtnText}>检测认领</Text>
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
