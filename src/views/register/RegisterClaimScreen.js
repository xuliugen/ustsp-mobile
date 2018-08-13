import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { px2dp, px2sp } from 'src/utils/device'
import { THEME_COLOR } from 'src/styles/common'
import { confirmClaimTch } from 'src/ajax/auth'

const mapStateToProps = state => ({
  userInfo: state.register.claimData,
  userId: state.register.userId
})

@connect(mapStateToProps)
export default class RegisterClaimScreen extends React.Component {
  static navigationOptions = {
    title: '认领',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  onClaimPress = async () => {
    await confirmClaimTch(this.props.userId, this.props.userInfo.email)
    this.props.navigation.push('RegisterComplete')
  }

  render() {
    const { userInfo } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.confirmContainer}>
          <Text style={styles.emailTxt}>{userInfo.email}</Text>
          <Text style={styles.confirmTxt}>检测到相关资料，是您本人么？</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userInfo.icon }} style={styles.avatar} />
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.university}>{userInfo.university} / {userInfo.school}</Text>
        </View>
        <View style={styles.nextOperation}>
          <TouchableOpacity onPress={this.onClaimPress} style={[styles.btns, styles.claimBtn]}>
            <Text style={styles.claimTxt}>确认认领</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.push('RegisterComplete')} style={[styles.btns, styles.notMeBtn]}>
            <Text style={styles.notMeTxt}>不是我</Text>
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

  confirmContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebf0f5'
  },
  emailTxt: {
    marginBottom: px2dp(16),
    color: THEME_COLOR,
    fontSize: px2sp(30)
  },
  confirmTxt: {
    marginBottom: px2dp(40),
    color: '#666',
    fontSize: px2sp(32)
  },

  profileContainer: {
    alignItems: 'center',
    paddingTop: px2dp(40),
    paddingBottom: px2dp(100)
  },
  avatar: {
    marginBottom: px2dp(30),
    width: px2dp(160),
    height: px2dp(160),
    borderRadius: px2dp(160 / 2)
  },
  name: {
    marginBottom: px2dp(20),
    color: '#666',
    fontSize: px2sp(32)
  },
  university: {
    color: '#666',
    fontSize: px2sp(32)
  },

  btns: {
    paddingVertical: px2dp(28),
    borderRadius: px2dp(10)
  },
  claimBtn: {
    marginBottom: px2dp(30),
    backgroundColor: THEME_COLOR
  },
  claimTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: px2sp(32)
  },
  notMeBtn: {
    borderWidth: 1,
    borderColor: '#999'
  },
  notMeTxt: {
    textAlign: 'center',
    color: '#999',
    fontSize: px2sp(32)
  }
})
